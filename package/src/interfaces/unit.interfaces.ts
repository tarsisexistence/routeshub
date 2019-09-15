import { InternalSpot, PrivateNotesKey, Spot } from './common.interfaces';

type SpotProps<R, C, S> = { [key in keyof (R & C)]: S };

/**
 * Describes unprocessed units
 */
export type InternalUnit<R, C = {}> = SpotProps<R, C, InternalSpot>;

/**
 * Describes processed units
 */
export type Unit<R = any, C = {}> = SpotProps<R, C, Spot> & PrivateNotesKey;

/**
 * Describes a bunch of unit
 */
export type Units<R = any> = { [key in keyof R]: Unit<R[key]> };

/**
 * Describes unprocessed feature (lazy) unit
 */
export type LazyUnit<R = any, C = any> = (
  parentSpot: Spot,
  alternativeName?: string
) => Unit<R, C>;

/**
 * Describes a bunch of lazy units
 */
export type LazyUnits<R = any> = { [key in keyof R]: LazyUnit<R[key]> };

/**
 * gives optional keys from main and children routes of unit
 */
export type partialFeatureRoutes<R, C> = {
  [key in keyof Partial<R & C>]: LazyUnit;
};
