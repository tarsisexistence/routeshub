import { Connectors, Spot } from '../interfaces';

/**
 * connects feature units
 * to parent unit
 * which route paths described
 * indirectly of parent routes
 */
export function connectNearby(
  nearby: Connectors,
  parentSpot: Spot = null
): void {
  Object.keys(nearby || {}).forEach((featureName: string) => {
    nearby[featureName](parentSpot, featureName);
  });
}
