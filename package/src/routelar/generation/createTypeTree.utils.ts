export const hasRouteVariable = (
  routes: Routelar.Generation.VirtualRoutes
): boolean => Object.keys(routes).some(route => route[0] === ':');

export const handleRoutesWithVariable = (
  routes: Routelar.Generation.VirtualRoutes
): Routelar.Generation.RoutesWithVariable =>
  Object.keys(routes).reduce(
    (acc: Routelar.Generation.RoutesWithVariable, key) => {
      if (key[0] === ':') {
        acc.variable = {
          name: key.slice(1),
          value: routes[key]
        };
      } else {
        acc.routesWithoutVariable[key] = routes[key];
      }

      return acc;
    },
    {
      variable: { name: '', value: [] },
      routesWithoutVariable: {},
    }
  );
