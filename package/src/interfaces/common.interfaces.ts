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
  stateFn: (params?: Params, ...restParams: Params[]) => string[];
  path: string;
  lazyPath?: string;
}

/**
 * Describes parameters
 * could used to generate state of the route
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
