import { Structure } from './common.interfaces';

/**
 * Describes a processed slice or slices
 */
export type Slice<T, C = {}> = { [key in keyof (T & C)]: Structure };

/**
 * Describes a bunch of slices
 * Finished part
 */
export type Slices<T> = { [key in keyof T]: Slice<T[key]> };
