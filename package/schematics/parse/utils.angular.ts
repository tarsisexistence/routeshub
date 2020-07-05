import { Tree } from '@angular-devkit/schematics';
import { WorkspaceSchema } from '@angular-devkit/core/src/experimental/workspace';
import {
  ArrayLiteralExpression,
  CallExpression,
  ClassDeclaration,
  Expression,
  Identifier,
  Node,
  ObjectLiteralExpression,
  Project,
  PropertyAccessExpression,
  TypeChecker
} from 'ts-morph';
import { LoadChildren, ParsedRoute, RouterExpression } from './types';
import { resolve, sep } from 'path';
import { evaluate } from '@wessberg/ts-evaluator';

export const findAngularJSON = (tree: Tree): WorkspaceSchema => {
  const angularJson = tree.read('angular.json');
  if (!angularJson) {
    throw new Error("angular.json doesn't exist");
  }

  const content = angularJson.toString();
  return JSON.parse(content) as WorkspaceSchema;
};

export const getRouterModuleClass = (project: Project): ClassDeclaration => {
  const moduleImport = project
    .getSourceFiles()
    .map(file => file.getImportDeclaration('@angular/router'))
    .filter(imp => !!imp)?.[0];

  if (!moduleImport) {
    throw new Error("RouterModule import didn't find");
  }

  const routeDef = moduleImport.getModuleSpecifierSourceFileOrThrow();
  const routerModule = routeDef.getClass('RouterModule');
  if (!routerModule) {
    throw new Error(`Can't find RouterModule in ${routeDef.getFilePath()}`);
  }

  return routerModule;
};

export const getRouteModuleExpressions: (
  project: Project
) => ArrayLiteralExpression | null = (
  project: Project
): ArrayLiteralExpression | null => {
  const routerModuleClass = getRouterModuleClass(project);
  const refs = routerModuleClass.findReferencesAsNodes();

  // todo add check for Router.RouterModule.for....
  const forRootExpressions = getRouterModuleCallExpressions(refs, 'forRoot');
  if (forRootExpressions.length > 1) {
    throw new Error('You have more than one RouterModule.forRoot expression');
  }

  const forRootExpression = forRootExpressions[0];
  return findRouterModuleArgumentValue(forRootExpression, project);
};

const findRouterModuleArgumentValue = (
  routerExpr: CallExpression,
  project: Project
): ArrayLiteralExpression | null => {
  const args = routerExpr.getArguments();
  if (args.length === 0) {
    const filePath = routerExpr.getSourceFile().getFilePath();
    throw new Error(`RouterModule in ${filePath} hasn't arguments`);
  }

  const firstArg = args[0];
  if (Node.isArrayLiteralExpression(firstArg)) {
    return firstArg;
  } else if (Node.isIdentifier(firstArg)) {
    return tryFindIdentifierValue(firstArg, project);
  }
  // todo for destruction

  return null;
};

const tryFindIdentifierValue = (
  id: Identifier,
  project: Project
): ArrayLiteralExpression | null => {
  const refs = id.findReferencesAsNodes();

  for (const ref of refs) {
    const parent = ref.getParent();
    if (parent && Node.isVariableDeclaration(parent)) {
      const initializer = parent.getInitializer();
      if (initializer && Node.isArrayLiteralExpression(initializer)) {
        return initializer;
      }
    } else if (parent && Node.isImportSpecifier(parent)) {
      const imp = parent.getImportDeclaration();
      const modulePath = imp.getModuleSpecifier().getLiteralValue();
      const currentSourceFile = imp.getSourceFile().getFilePath();
      const absolutePath = getAbsolutePath(currentSourceFile, modulePath);
      const sourceFile = project.getSourceFileOrThrow(absolutePath);
      const value = sourceFile.getVariableDeclaration(ref.getText());
      const initializer = value?.getInitializer();

      if (initializer && Node.isArrayLiteralExpression(initializer)) {
        return initializer;
      }
    }
  }

  return null;
};

const getAbsolutePath = (
  currentFilePath: string,
  importPath: string
): string => {
  const splitted = currentFilePath.split(sep);
  const currentDir = splitted.slice(0, splitted.length - 1).join(sep);

  return resolve(currentDir, `${importPath}.ts`);
};

export const getRouterModuleCallExpressions: (
  routeModules: Node[],
  expression: RouterExpression
) => CallExpression[] = (
  routeModules: Node[],
  expression: RouterExpression
): CallExpression[] => {
  return routeModules
    .map(ref => ref.getParent() as PropertyAccessExpression)
    .filter(node => Node.isPropertyAccessExpression(node))
    .filter(node => {
      if (Node.hasName(node)) {
        return node.getName() === expression;
      }

      return false;
    })
    .map(node => node.getParent() as CallExpression)
    .filter(node => Node.isCallExpression(node));
};

export const parseRoutes = (
  routes: ArrayLiteralExpression,
  typeChecker: TypeChecker
): (ParsedRoute | null)[] => {
  const elements = routes.getElements();
  return elements
    .filter(node => Node.isObjectLiteralExpression(node))
    .map(node => parseRoute(node as ObjectLiteralExpression, typeChecker));
};

const parseRoute = (
  route: ObjectLiteralExpression,
  typeChecker: TypeChecker
): ParsedRoute | null => {
  const path = readPath(route, typeChecker);
  const loadChildren = readLoadChildren(route, typeChecker);

  return {
    path,
    children: [],
    loadChildren
  };
};

const readPath = (
  node: ObjectLiteralExpression,
  typeChecker: TypeChecker
): string => {
  const expression = getPropertyValue(node, 'path');
  if (expression) {
    const path = evaluateExpression(expression, typeChecker);
    return typeof path === 'string' ? path : '/';
  }

  return '/';
};

export const readLoadChildren = (
  node: ObjectLiteralExpression,
  typeChecker: TypeChecker
): LoadChildren | null => {
  const expression = getPropertyValue(node, 'loadChildren');
  if (!expression) {
    return null;
  }
  if (Node.isStringLiteral(expression)) {
    return expression.getText();
  }

  let result: string | null = null;
  if (Node.isArrowFunction(expression)) {
    const body = expression.getBody();
    if (Node.isCallExpression(body)) {
      return parseLoadChildrenFunction(body);
    }
  }

  // loadChildren: 'foo' + '/' + 'bar'
  if (!result) {
    result = evaluateExpression(node, typeChecker);
  }
  return result;
};

const parseLoadChildrenFunction = (fnNode: CallExpression): string | null => {
  const args = fnNode.getArguments()?.[0];
  if (args && Node.isArrowFunction(args)) {
    const body = args.getBody();
    if (Node.isPropertyAccessExpression(body)) {
      return body.getName();
    }
  }

  return null;
}

const evaluateExpression = (
  node: Expression,
  morhpTypeChecker: TypeChecker
): string | null => {
  const compilerNode = node.compilerNode;
  const typeChecker = morhpTypeChecker.compilerObject;
  const result = evaluate({
    node: compilerNode,
    typeChecker
  });

  return result.success ? (result.value as string) : null;
};

const getPropertyValue = (
  node: ObjectLiteralExpression,
  property: string
): Expression | null => {
  for (const objectProperty of node.getProperties()) {
    if (Node.isPropertyAssignment(objectProperty)) {
      const name = objectProperty.getName();
      if (name === property) {
        return objectProperty.getInitializer() || null;
      }
    }
  }

  return null;
};
