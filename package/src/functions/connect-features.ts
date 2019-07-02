import { finalize, find } from 'rxjs/operators';
import { LazySlices, Slice, Slices, Structure } from '../interfaces';
import { hub } from '../hub';
import { PRIVATE_HUB_KEY } from '../constants';
import { partialFeatureRoutes } from '../interfaces/slice.interfaces';

/**
 * returns slice by key
 * from the second slices arg
 */
const findSlice = (parentKey: string | symbol, slices: Slices): Slice | null =>
  Object.values(slices || {}).find(
    (slice: Slice) => slice[PRIVATE_HUB_KEY] === parentKey
  );

/**
 * connects feature slices
 * to parent slice
 * which route paths described
 * directly in the parent routes
 */
export function connectFeatures<R = any, C = {}>(
  parentSliceOrKey: string | symbol | Slice,
  features: partialFeatureRoutes<R, C>
): void {
  const parentKey =
    typeof parentSliceOrKey === 'object'
      ? parentSliceOrKey[PRIVATE_HUB_KEY]
      : parentSliceOrKey;

  hub
    .asObservable()
    .pipe(
      find((slices: Slices) => Boolean(findSlice(parentKey, slices))),
      finalize(() => {
        const slice: Slice = findSlice(parentKey, hub.value);

        for (const route of Object.keys(features)) {
          const feature = features[route];
          const featureParent = slice[route];
          feature(featureParent);
        }
      })
    )
    .subscribe();
}

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
