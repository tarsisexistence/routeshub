import * as ts from 'typescript';

const createTupleType = (obj: string[]): ts.TupleTypeNode =>
  ts.createTupleTypeNode(
    obj.map(segment =>
      segment === 'string'
        ? ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)
        : ts.createLiteralTypeNode(ts.createStringLiteral(segment))
    )
  );

const handleRoutesWithVariable = (
  routes: Record<string, any>
): {
  objectWithoutVariable: Record<string, any>;
  variable: { name: string; value: any };
} =>
  Object.keys(routes).reduce(
    (
      acc: {
        objectWithoutVariable: Record<string, any>;
        variable: { name: string; value: any };
      },
      key
    ) => {
      if (key[0] !== ':') {
        acc.objectWithoutVariable[key] = routes[key];
      } else {
        acc.variable = {
          name: key.slice(1),
          value: routes[key]
        };
      }

      return acc;
    },
    {
      variable: { name: '', value: null },
      objectWithoutVariable: {}
    }
  );

const createIntersectionType = (
  routes: Record<string, any>
): ts.IntersectionTypeNode => {
  const { variable, objectWithoutVariable } = handleRoutesWithVariable(routes);

  return ts.createIntersectionTypeNode([
    createType(objectWithoutVariable),
    ts.createTypeLiteralNode([
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
      )
    ])
  ]);
};

const hasRouteVariable = (routes: Record<string, any>): boolean =>
  Object.keys(routes).some(route => route[0] === ':');

const createType = (obj: Record<string, any>): any => {
  const type: ts.TypeElement[] = [];
  const keys = Object.keys(obj);

  for (const prop of keys) {
    const typeValue = obj[prop];
    const hasChildVariable = hasRouteVariable(typeValue);
    let nextValue;

    if (Array.isArray(typeValue)) {
      nextValue = createTupleType(typeValue);
    } else if (hasChildVariable) {
      nextValue = createIntersectionType(typeValue);
    } else {
      nextValue = createType(typeValue);
    }

    type.push(
      ts.createPropertySignature(
        undefined,
        ts.createIdentifier(prop),
        undefined,
        nextValue,
        undefined
      )
    );
  }

  return ts.createTypeLiteralNode(type);
};

export const createRoutesType = (obj: any): any =>
  ts.createTypeAliasDeclaration(
    undefined,
    [ts.createModifier(ts.SyntaxKind.DeclareKeyword)],
    ts.createIdentifier('RoutelarRoutes'),
    undefined,
    hasRouteVariable(obj) ? createIntersectionType(obj) : createType(obj)
  );
