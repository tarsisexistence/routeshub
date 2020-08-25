export const excludeRoot = (
  routes: Routelar.TransformRoutes
): Omit<Routelar.TransformRoutes, 'root'> =>
  Object.keys(routes).reduce((acc, route) => {
    if (route !== 'root') {
      acc[route] = routes[route];
    }

    return acc;
  }, {});
