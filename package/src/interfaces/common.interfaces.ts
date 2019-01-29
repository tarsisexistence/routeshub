/**
 * Describes slice' value
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
 * Describes parameters that can be
 * used to generate route' state
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
