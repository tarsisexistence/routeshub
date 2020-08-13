export const excludeRoot = routes =>
  Object.keys(routes).reduce((acc, route) => {
    if (route !== 'root') {
      acc[route] = routes[route];
    }

    return acc;
  }, {});
