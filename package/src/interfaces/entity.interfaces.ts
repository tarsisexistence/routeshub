import { Structure } from './common.interfaces';

export type Entity<T, C = {}> = { [key in keyof (T & C)]: Structure };

export type Entities<T> = { [key in keyof T]: T[key] };
