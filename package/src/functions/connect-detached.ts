import { LazyUnits, Spot } from '../interfaces';

/**
 * connects feature units
 * to parent unit
 * which route paths described
 * indirectly of parent routes
 */
export function connectDetached(
  detached: LazyUnits,
  parent: Spot = null
): void {
  Object.keys(detached || {}).forEach((featureName: string) => {
    detached[featureName](parent, featureName);
  });
}
