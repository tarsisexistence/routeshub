import {
  InternalStructure,
  PrivateHubKey,
  Structure
} from './common.interfaces';

/**
 * Describes unprocessed slices
 */
export type InternalSlice<R, C = {}> = {
  [key in keyof (R & C)]: InternalStructure<any>
};

/**
 * Describes processed slices
 */
export type Slice<R = any, C = {}> = {
  [key in keyof (R & C)]: Structure & (PrivateHubKey | any)
};

/**
 * Describes a bunch of slices
 */
export type Slices<R = any> = { [key in keyof R]: Slice<R[key]> };

/**
 * Describes processed slices
 */
export type LazySlice<R = any, C = any> = (
  parentStructure: Structure,
  alternativeName?: string
) => Slice<R, C>;

export type LazySlices<R = any> = { [key in keyof R]: LazySlice<R[key]> };

/**
 * gives optional keys from main and children routes of slice
 */
export type partialFeatureRoutes<R, C> = {
  [key in keyof Partial<R & C>]: LazySlice
};
