export const excludeRoot = routes =>
  Object.keys(routes).reduce((acc, route) => {
    if (route !== 'root') {
      acc[route] = routes[route];
    }

    return acc;
  }, {});

export function flatRoutes(routes) {
  if (routes.root === undefined) {
    return routes;
  }

  const flattenRoutes = flatRoutes(routes.root);

  const normalizedRoutes =
    Object.keys(routes.root).length > 0 ? excludeRoot(routes) : routes;

  return {
    ...normalizedRoutes,
    ...flattenRoutes
  };
}
