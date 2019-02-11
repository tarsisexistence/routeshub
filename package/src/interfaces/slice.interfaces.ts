import { Structure } from './common.interfaces';

/**
 * Describes processed slices
 */
export type Slice<R, C = {}> = { [key in keyof (R & C)]: Structure };

/**
 * Describes a bunch of the slices
 */
export type Slices<R> = { [key in keyof R]: Slice<R[key]> };
