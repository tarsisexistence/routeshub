export const excludeRoot = (
  routes: Routelar.Generation.TransformRoutes
): Omit<Routelar.Generation.TransformRoutes, 'root'> =>
  Object.keys(routes).reduce((acc, route) => {
    if (route !== 'root') {
      acc[route] = routes[route];
    }

    return acc;
  }, {});

// TODO: 'string' signature possibly not safe
export const normalizePath = (path: string): string =>
  path[0] === ':' ? 'string' : path;

export const isLeaf = (node: string[] | Record<any, any>): boolean =>
  Array.isArray(node);
