import VirtualRoutes = Routelar.VirtualRoutes;

declare namespace Routelar {
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
}

declare const x: VirtualRoutes;
