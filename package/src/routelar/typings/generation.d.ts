declare namespace Routelar.Generation {
  type TransformRoutesLeaf = {};

  interface TransformRoutes {
    [route: string]: TransformRoutes | TransformRoutesLeaf;
    root?: TransformRoutes | TransformRoutesLeaf;
  }

  type VirtualRoutesLeaf = string[];

  interface VirtualRoutes {
    [route: string]: VirtualRoutes | VirtualRoutesLeaf;
    root?: VirtualRoutesLeaf;
  }

  type RouteVariable = {
    name: string;
    value: VirtualRoutesLeaf | VirtualRoutes;
  };

  interface RoutesWithVariable {
    variable: Routelar.Generation.RouteVariable;
    routesWithoutVariable: Routelar.Generation.VirtualRoutes;
  }
}
