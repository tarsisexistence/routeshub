import { Tree } from '@angular-devkit/schematics';
import { WorkspaceSchema } from '@angular-devkit/core/src/experimental/workspace';
import * as ts from 'typescript';
import { resolve } from 'path';
import { FindMainModuleOptions, RouterExpression } from './types';

const findAngularJSON = (tree: Tree): WorkspaceSchema => {
  const angularJson = tree.read('angular.json');
  if (!angularJson) {
    throw new Error("angular.json doesn't exist");
  }

  const content = angularJson.toString();
  return JSON.parse(content) as WorkspaceSchema;
};

const findMainFile = ({
  tree,
  program,
  project
}: FindMainModuleOptions): ts.SourceFile => {
  const angularJson = findAngularJSON(tree);
  const workspace = angularJson.projects[project];
  const relativeMainPath = workspace?.architect?.build?.options?.main || '';
  const absoluteMainPath = resolve(relativeMainPath);

  const mainFile = program
    .getSourceFiles()
    .find(sourceFile => sourceFile.fileName === absoluteMainPath);

  if (!mainFile) {
    throw new Error("Can't find main file");
  }

  return mainFile;
};

const tryFindMainModule = (
  node: ts.Node,
  program: ts.Program
): string | null => {
  if (ts.isIdentifier(node) && node.text === 'bootstrapModule') {
    const propAccess = node.parent;
    if (!propAccess || !ts.isPropertyAccessExpression(propAccess)) {
      return null;
    }

    const tempExpr = propAccess.parent;
    if (!tempExpr || !ts.isCallExpression(tempExpr)) {
      return null;
    }

    const module = tempExpr.arguments[0];
    const typeChecker = program.getTypeChecker();
    const symbol = typeChecker.getTypeAtLocation(module).getSymbol();
    if (!symbol) {
      return null;
    }

    const declarations = symbol.getDeclarations();
    if (!declarations) {
      return null;
    }

    return resolve(declarations[0].getSourceFile().fileName);
  }

  let mainPath: null | string = null;
  node.forEachChild(nextNode => {
    if (mainPath) {
      return mainPath;
    }
    mainPath = tryFindMainModule(nextNode, program);
  });

  return mainPath;
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

const getRouteModuleIdentifiers = (program: ts.Program): ts.Identifier[] => {
  const typeChecker = program.getTypeChecker();
  const routerType = getRouterModuleType(program, typeChecker);

  const routesUsage: ts.Identifier[] = [];
  function routerVisitor(node: ts.Node): void {
    if (isRouterModule(typeChecker, routerType, node)) {
      routesUsage.push(node as ts.Identifier);
    } else {
      node.forEachChild(routerVisitor);
    }
  }

  program.getSourceFiles().forEach(sourceFile => {
    sourceFile.forEachChild(routerVisitor);
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
  routeModules: ts.Identifier[]
): ts.CallExpression[] => {
  return routeModules
    .filter(node => hasExpression(node, expression))
    .map(node => findRouterCallExpression(node))
    .filter(node => !!node)
    .map(node => node as ts.CallExpression);
};

// todo routes
const getRoutes = (routeModules: ts.Identifier[], forRoot: boolean) => {
  const expression = forRoot ? 'forRoot' : 'forChild';
  const expressions = getRouterCallExpressions(expression, routeModules);
  return expressions.map(expr => expr.arguments[0]);
};

export const findAppModule = ({
  tree,
  program,
  project
}: FindMainModuleOptions): string => {
  const mainFile = findMainFile({ tree, program, project });

  // todo change
  const routesModules = getRouteModuleIdentifiers(program);
  const args = getRoutes(routesModules, true);
  console.log(args.map(arg => arg.getText()));

  const appModulePath = tryFindMainModule(mainFile, program);
  return appModulePath || '';
};
