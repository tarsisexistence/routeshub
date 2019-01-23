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
 * Describes hub's state
 */
export interface State<E> {
  [key: string]: E;
}
