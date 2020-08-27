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

  type RouteVariable = { name: string; value: any };

  interface VariableRemover {
    variable: Routelar.Generation.RouteVariable;
    routesWithoutVariable: Routelar.Generation.VirtualRoutes;
  }
}
