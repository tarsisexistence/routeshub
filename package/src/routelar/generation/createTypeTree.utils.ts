export const hasRouteVariable = (
  routes: Routelar.Generation.VirtualRoutes
): boolean => Object.keys(routes).some(route => route[0] === ':');

export const handleRoutesWithVariable = (
  routes: Routelar.Generation.VirtualRoutes
): Routelar.Generation.VariableRemover =>
  Object.keys(routes).reduce(
    (acc: Routelar.Generation.VariableRemover, key) => {
      if (key[0] !== ':') {
        acc.routesWithoutVariable[key] = routes[key];
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
      routesWithoutVariable: {}
    }
  );
