export interface Structure {
  id: number;
  parentId: number;
  routeName: string;
  path: string;
  lazyPath?: string;
  state: string[];
  stateFn: (params?: Params, ...restParams: Params[]) => string[];
}

export interface Params {
  [param: string]: any;
}

export interface State<E> {
  [key: string]: E;
}
