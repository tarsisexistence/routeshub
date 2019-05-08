import { Slice } from './slice.interfaces';

/**
 * Basic hub structure
 *
 * Describes a slice's value
 */
export interface Structure {
  id: number;
  parentId: number;
  routeName: string;
  state: string[];
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
 * Describes a store-like essence
 */
export interface Hub<E> {
  [key: string]: E;
}

/**
 * Describes a slice's value
 * that has unprocessed children
 */
export interface InternalStructure<C> extends Structure {
  children?: Slice<C>;
}
