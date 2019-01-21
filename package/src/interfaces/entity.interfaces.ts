import { Structure } from './common.interfaces';

/**
 * Describes a processed slice or slices
 */
export type Entity<T, C = {}> = { [key in keyof (T & C)]: Structure };

/**
 * Describes a bunch of slices
 * Finished part
 */
export type Entities<T> = { [key in keyof T]: Entity<T[key]> };
