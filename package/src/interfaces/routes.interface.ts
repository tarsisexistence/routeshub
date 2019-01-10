export interface Route {
  path: string;
  id?: number;
  component?: any;
  children?: Routes<any>;
  lazyPath?: string;
  state?: string[];
}

export interface BaseRoute {
  root: Route;
}

export type Routes<T> = { [key in keyof T]: Route };
