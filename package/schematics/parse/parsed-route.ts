type VisitorType = (route: ParsedRoute) => void;

export class ParsedRoute {
  path: string;
  children: ParsedRoute[] = [];
  loadChildren: string | null = null;
  redirectTo: string | null = null;

  constructor(
    path: string,
    children: ParsedRoute[] = [],
    loadChildren: string | null = null,
    redirectTo: string | null = null
  ) {
    this.path = path;
    this.children = children;
    this.loadChildren = loadChildren;
    this.redirectTo = redirectTo;
  }

  forEachChild(visitor: VisitorType): void {
    this.children.forEach(visitor);
  }
}
