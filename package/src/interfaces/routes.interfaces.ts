/**
 * Allows to describe the base route
 * Extends interface with root
 */
export interface RootRoute {
  root: RouteNote;
}

/**
 * Describes a basic route record via required path
 * and other optional parameters
 */
export interface RouteNote<C = {}> {
  path: string;
  id?: number;
  component?: any;
  children?: RoutesNotes<C>;
  lazyPath?: string;
  state?: string[];
}

/**
 * Describes an object of basic routes
 */
export type RoutesNotes<T, C = {}> = { [key in keyof T]: RouteNote<C> };
