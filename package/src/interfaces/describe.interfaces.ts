/**
 * Allows to describe the base route
 * Extends interface with root
 */
export interface Root {
  root: Describe;
}

/**
 * Describes a basic route
 */
export interface Describe<C = {}> {
  path: string;
  id?: number;
  component?: any;
  children?: Describes<C>;
  lazyPath?: string;
  state?: string[];
}

/**
 * Describes an object of basic routes
 */
export type Describes<T, C = {}> = { [key in keyof T]: Describe<C> };
