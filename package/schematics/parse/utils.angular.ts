import { Tree } from '@angular-devkit/schematics';
import { WorkspaceSchema } from '@angular-devkit/core/src/experimental/workspace';
import * as ts from 'typescript';
import { dirname, resolve } from 'path';
import { LoadChildren, NodeWithFile, RouterExpression } from './types';
import { ParsedRoute } from './parsed-route';
import { findClassDeclaration } from './utils.ast';
import {
  readChildren,
  readLoadChildren,
  readPath,
  readRedirectTo
} from './utils.props';

export const findAngularJSON = (tree: Tree): WorkspaceSchema => {
  const angularJson = tree.read('angular.json');
  if (!angularJson) {
    throw new Error("angular.json doesn't exist");
  }

  const content = angularJson.toString();
  return JSON.parse(content) as WorkspaceSchema;
};

const getRouterDefinitionsFile = (program: ts.Program): ts.SourceFile => {
  const routerDefinitionsFile = program
    .getSourceFiles()
    .filter(file => file.fileName.includes('angular/router'))
    .find(file => file.fileName.includes('router.d.ts'));

  if (routerDefinitionsFile) {
    return routerDefinitionsFile;
  } else {
    throw new Error("Angular router didn't find");
  }
};

// todo refactor
export const getRouterModuleType = (
  program: ts.Program,
  typeChecker: ts.TypeChecker
): ts.Type => {
  const routerDefinitions = getRouterDefinitionsFile(program);

  let routerModule: null | ts.Identifier = null;
  routerDefinitions.forEachChild(node => {
    if (ts.isClassDeclaration(node) && node?.name?.text === 'RouterModule') {
      routerModule = node.name;
    }
  });

  if (!routerModule) {
    throw new Error("Router module doesn't exist");
  }

  const symbol = typeChecker.getTypeAtLocation(routerModule).getSymbol();
  if (symbol) {
    return typeChecker.getDeclaredTypeOfSymbol(symbol);
  } else {
    throw new Error("Router symbol didn't find");
  }
};

const isRouterModule = (
  typeChecker: ts.TypeChecker,
  routerType: ts.Type,
  node: ts.Node
): boolean => {
  if (ts.isIdentifier(node)) {
    const symbol = typeChecker.getTypeAtLocation(node).getSymbol();
    if (symbol) {
      const nodeType = typeChecker.getDeclaredTypeOfSymbol(symbol);
      if (nodeType === routerType) {
        return true;
      }
    }
  }

  return false;
};

export const getRouteModuleIdentifiers = (
  program: ts.Program
): NodeWithFile<ts.Identifier>[] => {
  const typeChecker = program.getTypeChecker();
  const routerType = getRouterModuleType(program, typeChecker);

  const routesUsage: NodeWithFile<ts.Identifier>[] = [];
  function routerVisitor(file: ts.SourceFile, node: ts.Node): void {
    if (isRouterModule(typeChecker, routerType, node)) {
      routesUsage.push({ node: node as ts.Identifier, file });
    } else {
      node.forEachChild(child => routerVisitor(file, child));
    }
  }

  program.getSourceFiles().forEach(sourceFile => {
    sourceFile.forEachChild(node => routerVisitor(sourceFile, node));
  });

  return routesUsage;
};

function findRouterCallExpression(node: ts.Node): ts.CallExpression | null {
  const { parent } = node;
  if (parent && ts.isCallExpression(parent)) {
    return parent;
  } else if (parent && ts.isPropertyAccessExpression(parent)) {
    return findRouterCallExpression(parent);
  }

  return null;
}

function hasExpression(node: ts.Node, expression: RouterExpression): boolean {
  const { parent } = node;
  if (parent && ts.isPropertyAccessExpression(parent)) {
    const { name } = parent;
    return name.text === expression ? true : hasExpression(parent, expression);
  }

  return false;
}

const getRouterCallExpressions = (
  expression: RouterExpression,
  routeModules: NodeWithFile<ts.Identifier>[]
): NodeWithFile<ts.CallExpression>[] => {
  return routeModules
    .filter(({ node }) => hasExpression(node, expression))
    .map(({ node, file }) => ({
      node: findRouterCallExpression(node),
      file
    }))
    .filter(({ node }) => !!node)
    .map(node => node as NodeWithFile<ts.CallExpression>);
};

export const getImportDeclarationForId = (
  node: ts.Node
): ts.ImportDeclaration | null => {
  const { parent } = node;
  if (parent) {
    if (ts.isImportDeclaration(parent)) {
      return parent;
    } else {
      return getImportDeclarationForId(parent);
    }
  }

  return null;
};

export const getFileWithId = (
  node: ts.ImportDeclaration,
  program: ts.Program,
  relativeFile: string
): ts.SourceFile | null => {
  const { moduleSpecifier } = node;
  if (ts.isStringLiteral(moduleSpecifier)) {
    const dir = dirname(relativeFile);
    const relativePath = moduleSpecifier.text;
    const absolutePath = resolve(dir, relativePath);

    return (
      program
        .getSourceFiles()
        .find(file => file.fileName.includes(absolutePath)) || null
    );
  }

  return null;
};

const tryFindIdentifierValue = (
  program: ts.Program,
  nodeWithFile: NodeWithFile<ts.Identifier>,
  checkPosition: boolean = false
): ts.ArrayLiteralExpression | null => {
  const identifier = nodeWithFile.node;
  const ids: NodeWithFile<ts.Identifier>[] = [];

  function visitor(node: ts.Node): void {
    if (
      ts.isIdentifier(node) &&
      node.text === identifier.text &&
      (checkPosition ? node.pos !== identifier.pos : true)
    ) {
      ids.push({ node, file: nodeWithFile.file });
    } else {
      node.forEachChild(visitor);
    }
  }

  nodeWithFile.file?.forEachChild(visitor);

  const identifierValues = ids
    .map(({ node }) => {
      const { parent } = node;
      if (ts.isVariableDeclaration(parent)) {
        const { initializer } = parent;
        if (initializer && ts.isArrayLiteralExpression(initializer)) {
          return initializer;
        }
      } else if (ts.isImportSpecifier(parent)) {
        // todo also need to see cases like import * as & import variable as
        const importDecl = getImportDeclarationForId(parent);
        if (importDecl) {
          const fileWithDefinition = getFileWithId(
            importDecl,
            program,
            nodeWithFile.file.fileName
          );

          if (fileWithDefinition) {
            return tryFindIdentifierValue(
              program,
              {
                node: identifier,
                file: fileWithDefinition
              },
              false
            );
          }
        }
      }
    })
    .filter(value => !!value);

  const { length } = identifierValues;
  return (length && identifierValues[length - 1]) || null;
};

export const getRoutes = (
  program: ts.Program,
  routeModules: NodeWithFile<ts.Identifier>[],
  forRoot: boolean
) => {
  const expression = forRoot ? 'forRoot' : 'forChild';
  const expressions = getRouterCallExpressions(expression, routeModules);

  return expressions.map(expr => {
    const arg = expr.node.arguments[0];
    if (ts.isArrayLiteralExpression(arg)) {
      return arg;
    } else if (ts.isIdentifier(arg)) {
      return tryFindIdentifierValue(
        program,
        {
          node: arg,
          file: expr.file
        },
        true
      );
    }
  });
};

export const parseRoutes = (
  routes: ts.ArrayLiteralExpression,
  program: ts.Program
): ParsedRoute[] => {
  const { elements } = routes;
  return elements
    .filter(node => ts.isObjectLiteralExpression(node))
    .map(node => parseRoute(node as ts.ObjectLiteralExpression, program))
    .filter(route => !!route) as ParsedRoute[];
};

const parseRoute = (
  route: ts.ObjectLiteralExpression,
  program: ts.Program
): ParsedRoute | null => {
  const typeChecker = program.getTypeChecker();
  const path = readPath(route, typeChecker);
  if (typeof path === 'string') {
    const children = readChildren(route, program);
    const loadChildren = readLoadChildren(route, typeChecker);
    const redirectTo = readRedirectTo(route, typeChecker);

    // todo for develop, remove after
    if (loadChildren) {
      console.log(
        getModuleImports(loadChildren, program)
          .map(imprt => imprt.text)
          .join(' ')
      );
    }

    return new ParsedRoute(
      path,
      children,
      loadChildren?.moduleName,
      redirectTo
    );
  }

  return null;
};

const getModuleImports = (
  loadChildren: LoadChildren,
  program: ts.Program
): ts.Identifier[] => {
  const { moduleName, childPath } = loadChildren;
  const sourceFile = program
    .getSourceFiles()
    .find(file => file.fileName.includes(childPath));
  if (!sourceFile) {
    throw new Error(`Can't find file ${childPath}`);
  }

  const classDeclaration = findClassDeclaration(moduleName, sourceFile);
  if (!classDeclaration) {
    throw new Error(
      `Can't find module ${moduleName} in ${sourceFile.fileName}`
    );
  }

  const imports = getImports(classDeclaration);
  if (imports) {
    return imports.elements.filter(element =>
      ts.isIdentifier(element)
    ) as ts.Identifier[];
  } else {
    return [];
  }
};

const getImports = (
  moduleDeclaration: ts.ClassDeclaration
): ts.ArrayLiteralExpression | null => {
  const decorators = moduleDeclaration.decorators;
  const ngModule = decorators
    ?.map(decorator => decorator.expression as ts.CallExpression)
    .map(expression => expression.expression as ts.Identifier)
    .find(id => id.text === 'NgModule');

  if (!ngModule) {
    throw new Error(
      `NgModule decorator for ${moduleDeclaration?.name?.text} didn't find`
    );
  }

  const ngModuleExpression = ngModule.parent as ts.CallExpression;
  let imports: ts.Identifier | null = null;

  function visitor(node: ts.Node): void {
    if (imports) {
      return;
    }

    if (ts.isIdentifier(node) && node.text === 'imports') {
      imports = node;
    } else {
      node.forEachChild(visitor);
    }
  }

  ngModuleExpression.forEachChild(visitor);

  if (imports) {
    const { parent } = imports;
    if (ts.isPropertyAssignment(parent)) {
      const { initializer } = parent;
      if (ts.isArrayLiteralExpression(initializer)) {
        return initializer;
      }
    }
  }

  return null;
};
