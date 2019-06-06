import { LoadChildren } from '@angular/router';

/**
 * Describes the base route
 */
export interface RootRoute {
  root: RootRouteNote;
}

/**
 * Describes a basic route note
 * and other optional parameters
 */
export interface RouteNote<C = {}> {
  path: string;
  name?: string;
  lazy?: LoadChildren;
  children?: RoutesNotes<C>;
}

/**
 * Describes a root note
 * and other optional parameters
 */
export interface RootRouteNote<C = {}> {
  path?: string;
  lazy?: string;
  children?: RoutesNotes<C>;
}

/**
 * Describes an object of basic routes
 */
type Note<C> = RouteNote<C> | RootRouteNote<C>;

/**
 * Describes a bunch of RouteNote
 */
export type RoutesNotes<R, C = {}> = { [key in keyof R]: Note<C> };
