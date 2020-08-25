import { excludeRoot } from './generation.utils';

export function flatRoutes(routes: Routelar.TransformRoutes): Omit<Routelar.TransformRoutes, 'root'> {
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
