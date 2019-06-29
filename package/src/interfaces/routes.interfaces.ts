/**
 * Describes a root note
 * and other optional parameters
 */
export interface RootNote<C = {}> {
  path?: string;
  children?: Notes<C>;
}

/**
 * Describes the base route
 */
export interface Root<C = {}> {
  root: RootNote<C>;
}

/**
 * Describes a basic route note
 * and other optional parameters
 */
export interface Note<C = {}> {
  path: string;
  name?: string;
  children?: Notes<C>;
}

/**
 * Describes a bunch of Note
 */
export type Notes<R = any, C = {}> = {
  [key in keyof R]: Note<C> | RootNote<C>
};
