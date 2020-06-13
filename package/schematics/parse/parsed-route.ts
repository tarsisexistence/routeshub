type VisitorType = (route: ParsedRoute) => void;

export class ParsedRoute {
  path: string;
  children: ParsedRoute[] = [];

  constructor(path: string, children: ParsedRoute[] = []) {
    this.path = path;
    this.children = children;
  }

  forEachChild(visitor: VisitorType): void {
    this.children.forEach(visitor);
  }
}
