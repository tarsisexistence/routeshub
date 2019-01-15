export interface Route<Cr = {}> {
  path: string;
  id?: number;
  component?: any;
  children?: Routes<Cr>;
  lazyPath?: string;
  state?: string[];
}

export interface BaseRoute {
  root: Route;
}

export type Routes<T, Cr = {}> = { [key in keyof T]: Route<Cr> };
