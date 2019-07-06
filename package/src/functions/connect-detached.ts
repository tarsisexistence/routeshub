import { LazySlices, Structure } from '../interfaces';

/**
 * connects feature slices
 * to parent slice
 * which route paths described
 * indirectly of parent routes
 */
export function connectDetached(
  detached: LazySlices,
  parent: Structure = null
): void {
  Object.keys(detached || {}).forEach((featureName: string) => {
    detached[featureName](parent, featureName);
  });
}
