import {
  InternalStructure,
  PrivateNotesKey,
  Structure
} from './common.interfaces';

type StructureKeys<R, C, S> = { [key in keyof (R & C)]: S };

/**
 * Describes unprocessed slices
 */
export type InternalSlice<R, C = {}> = StructureKeys<R, C, InternalStructure>;

/**
 * Describes processed slices
 */
export type Slice<R = any, C = {}> = StructureKeys<R, C, Structure> &
  PrivateNotesKey;

/**
 * Describes a bunch of slices
 */
export type Slices<R = any> = { [key in keyof R]: Slice<R[key]> };

/**
 * Describes unprocessed feature (lazy) slice
 */
export type LazySlice<R = any, C = any> = (
  parentStructure: Structure,
  alternativeName?: string
) => Slice<R, C>;

/**
 * Describes a bunch of lazy slices
 */
export type LazySlices<R = any> = { [key in keyof R]: LazySlice<R[key]> };

/**
 * gives optional keys from main and children routes of slice
 */
export type partialFeatureRoutes<R, C> = {
  [key in keyof Partial<R & C>]: LazySlice
};
