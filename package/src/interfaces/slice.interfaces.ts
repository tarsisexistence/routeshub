import { Structure } from './common.interfaces';

/**
 * Describes a processed slice or slices
 */
export type Slice<R, C = {}> = { [key in keyof (R & C)]: Structure };

/**
 * Describes a bunch of slices
 */
export type Slices<R> = { [key in keyof R]: Slice<R[key]> };
