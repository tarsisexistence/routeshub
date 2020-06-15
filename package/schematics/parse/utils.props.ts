import * as ts from 'typescript';
import { ParsedRoute } from './parsed-route';
import { parseRoutes } from './utils.angular';
import { LoadChildren } from './types';
import { evaluate } from '@wessberg/ts-evaluator';

export const getPropertyValue = (
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

const getModulePath = (loadChildrenPath: string): string => {
  return loadChildrenPath.split('#')[0];
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

export const readPath = (
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

export const readChildren = (
  node: ts.ObjectLiteralExpression,
  program: ts.Program
): ParsedRoute[] => {
  const expression = getPropertyValue(node, 'children');
  if (expression && ts.isArrayLiteralExpression(expression)) {
    return parseRoutes(expression, program);
  }

  return [];
};

export const readRedirectTo = (
  node: ts.ObjectLiteralExpression,
  typeChecker: ts.TypeChecker
): string | null => {
  const expression = getPropertyValue(node, 'redirectTo');
  if (expression) {
    return evaluateExpression(expression, typeChecker);
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
      childPath: getModulePath(expression.text),
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
        childPath: getModulePath(childPath),
        moduleName: getModuleNameFromString(childPath)
      };
    }
  }

  return result;
};
