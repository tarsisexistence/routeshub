import { Tree } from '@angular-devkit/schematics';
import { WorkspaceSchema } from '@angular-devkit/core/src/experimental/workspace';
import * as ts from 'typescript';
import { dirname, resolve } from 'path';
import { LoadChildren, NodeWithFile, RouterExpression } from './types';
import { evaluate } from '@wessberg/ts-evaluator';
import { ParsedRoute } from './parsed-route';

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
    return new ParsedRoute(path, children, loadChildren?.moduleName);
  }

  return null;
};

// todo check for old syntax: path#ModuleName
export const readLoadChildren = (
  node: ts.ObjectLiteralExpression,
  typeChecker: ts.TypeChecker
): LoadChildren | null => {
  const expression = getPropertyValue(node, 'loadChildren');
  if (!expression) {
    return null;
  }

  if (ts.isStringLiteral(expression)) {
    return {
      childPath: expression.text,
      moduleName: getModuleNameFromString(expression.text)
    };
  }

  let result: LoadChildren | null = null;
  const visitor = (n: ts.Node) => {
    if (n.kind === ts.SyntaxKind.ImportKeyword) {
      const parent = n.parent as ts.CallExpression;
      const arg = parent.arguments[0];
      const childPath = evaluateExpression(arg, typeChecker);
      const moduleName = getModuleNameFromImportExpression(parent);

      if (childPath && moduleName) {
        result = { childPath, moduleName };
      }
    }
    if (result) {
      return;
    }
    n.forEachChild(visitor);
  };
  expression.forEachChild(visitor);

  // loadChildren: 'foo' + '/' + 'bar'
  if (!result) {
    const childPath = evaluateExpression(node, typeChecker);
    if (childPath) {
      return {
        childPath,
        moduleName: getModuleNameFromString(childPath)
      };
    }
  }

  return result;
};

const getModuleNameFromImportExpression = (
  importExpression: ts.CallExpression
): string | null => {
  const { parent } = importExpression;
  const loadChildrenFnBody = parent.parent as ts.CallExpression;
  const args = loadChildrenFnBody.arguments;
  const moduleResolveFn = args[0];
  if (ts.isArrowFunction(moduleResolveFn)) {
    const { body } = moduleResolveFn;
    if (ts.isPropertyAccessExpression(body)) {
      const { name } = body;
      if (ts.isIdentifier(name)) {
        return name.text;
      }
    }
  }

  return null;
};

const getModuleNameFromString = (str: string): string => {
  return str.split('#')[1];
};

const readChildren = (
  node: ts.ObjectLiteralExpression,
  program: ts.Program
): ParsedRoute[] => {
  const expression = getPropertyValue(node, 'children');
  if (expression && ts.isArrayLiteralExpression(expression)) {
    return parseRoutes(expression, program);
  }

  return [];
};

const readPath = (
  node: ts.ObjectLiteralExpression,
  typeChecker: ts.TypeChecker
): string | null => {
  const expression = getPropertyValue(node, 'path');
  if (expression) {
    const path = evaluateExpression(expression, typeChecker);
    return typeof path === 'string' ? path : '/';
  }

  return null;
};

const evaluateExpression = (
  node: ts.Expression,
  typeChecker: ts.TypeChecker
): string | null => {
  const result = evaluate({
    node,
    typeChecker
  });

  return result.success ? (result.value as string) : null;
};

const getPropertyValue = (
  node: ts.ObjectLiteralExpression,
  property: string
): ts.Expression | null => {
  for (const objectProperty of node.properties) {
    if (ts.isPropertyAssignment(objectProperty)) {
      const { name } = objectProperty;
      if (ts.isIdentifier(name)) {
        const { text } = name;
        if (text === property) {
          return objectProperty.initializer;
        }
      }
    }
  }

  return null;
};
