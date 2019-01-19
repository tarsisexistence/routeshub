import { StateParams } from '../interfaces';

export interface Structure {
  id: number;
  parentId: number;
  path: string;
  state: string[];
  route: string;
  lazyPath?: string;
  stateFn: (params?: StateParams, ...restParams: StateParams[]) => string[];
}

export type Entity<T, C = {}> = { [key in keyof (T & C)]: Structure };

export type Entities<T> = { [key in keyof T]: T[key] };
