import * as ts from 'typescript';

import {
  handleRoutesWithVariable,
  hasRouteVariable
} from './createTypeTree.utils';

const createTupleType = (
  tuple: Routelar.Generation.VirtualRoutesLeaf
): ts.TupleTypeNode =>
  ts.createTupleTypeNode(
    tuple.map(segment =>
      segment === 'string'
        ? ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)
        : ts.createLiteralTypeNode(ts.createStringLiteral(segment))
    )
  );

const createIndexType = (
  variable: Routelar.Generation.RouteVariable
): ts.IndexSignatureDeclaration =>
  ts.createIndexSignature(
    undefined,
    undefined,
    [
      ts.createParameter(
        undefined,
        undefined,
        undefined,
        ts.createIdentifier(variable.name),
        undefined,
        ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
        undefined
      )
    ],
    Array.isArray(variable.value)
      ? createTupleType(variable.value)
      : createType(variable.value)
  );

export const createIntersectionType = (
  routes: Routelar.Generation.VirtualRoutes
): ts.IntersectionTypeNode => {
  const { variable, routesWithoutVariable } = handleRoutesWithVariable(routes);
  const onlyVariable = Object.keys(routesWithoutVariable).length === 0;
  const typeNodes: ts.TypeNode[] = [
    ts.createTypeLiteralNode([createIndexType(variable)])
  ];

  if (!onlyVariable) {
    typeNodes.unshift(createType(routesWithoutVariable));
  }

  // TODO: it works but semantically wrong since if previous condition is false then there is no intersection, only index type
  return ts.createIntersectionTypeNode(typeNodes);
};

export const createType = (
  routes: Routelar.Generation.VirtualRoutes
): ts.TypeLiteralNode => {
  const type: ts.TypeElement[] = [];
  const keys = Object.keys(routes);

  for (const route of keys) {
    const virtualRouteValue = routes[route];
    let routeValue;

    if (Array.isArray(virtualRouteValue)) {
      routeValue = createTupleType(virtualRouteValue);
    } else if (hasRouteVariable(virtualRouteValue)) {
      routeValue = createIntersectionType(virtualRouteValue);
    } else {
      routeValue = createType(virtualRouteValue);
    }

    type.push(
      ts.createPropertySignature(
        undefined,
        ts.createIdentifier(route),
        undefined,
        routeValue,
        undefined
      )
    );
  }

  return ts.createTypeLiteralNode(type);
};

export const createTypeTree = (
  routes: Routelar.Generation.VirtualRoutes
): ts.TypeAliasDeclaration =>
  ts.createTypeAliasDeclaration(
    undefined,
    [ts.createModifier(ts.SyntaxKind.DeclareKeyword)],
    ts.createIdentifier('RoutelarRoutes'),
    undefined,
    hasRouteVariable(routes)
      ? createIntersectionType(routes)
      : createType(routes)
  );
