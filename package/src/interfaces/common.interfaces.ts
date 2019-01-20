export interface Structure {
  id: number;
  parentId: number;
  path: string;
  state: string[];
  routeName: string;
  lazyPath?: string;
  stateFn: (params?: Params, ...restParams: Params[]) => string[];
}

export interface Params {
  [param: string]: any;
}
