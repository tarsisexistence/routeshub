/**
 * Allows to describe the base route
 * Extends interface with root
 */
export interface BaseRoute {
  root: Route;
}

/**
 * Describes a basic route
 */
export interface Route<C = {}> {
  path: string;
  id?: number;
  component?: any;
  children?: Routes<C>;
  lazyPath?: string;
  state?: string[];
}

/**
 * Describes an object of basic routes
 */
export type Routes<T, C = {}> = { [key in keyof T]: Route<C> };
