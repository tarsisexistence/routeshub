import { Slice } from './slice.interfaces';

/**
 * basic hub structure
 *
 * describes a slice's value
 */
export interface Structure {
  id: number;
  parentId: number;
  state: string[];
  name: string;
  path: string;
  lazy?: string;
}

/**
 * Describes parameters
 */
export interface Params {
  [param: string]: any;
}

/**
 * describes a store-like essence
 */
export interface Hub<E> {
  [key: string]: E;
}

/**
 * describes a slice's value
 * that has unprocessed children
 */
export interface InternalStructure<C> extends Structure {
  children?: Slice<C>;
}

/**
 * describes Route Name options
 */
export interface RouteNameOptions {
  root?: string;
  wildcard?: string;
}
