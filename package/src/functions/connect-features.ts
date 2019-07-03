import { finalize, find } from 'rxjs/operators';
import { Slice, Slices } from '../interfaces';
import { hub } from '../hub';
import { PRIVATE_NOTES_KEY } from '../constants';
import { partialFeatureRoutes } from '../interfaces/slice.interfaces';

/**
 * returns slice by key
 * from the second slices arg
 */
const findSlice = (parentKey: string | symbol, slices: Slices): Slice | null =>
  Object.values(slices || {}).find(
    (slice: Slice) => slice[PRIVATE_NOTES_KEY] === parentKey
  );

/**
 * connects feature slices
 * to parent slice
 * which route paths described
 * directly in the parent routes
 */
export function connectFeatures<R = any, C = {}>(
  key: string | symbol,
  features: partialFeatureRoutes<R, C>
): void {
  hub
    .asObservable()
    .pipe(
      find((slices: Slices) => Boolean(findSlice(key, slices))),
      finalize(() => {
        const slice: Slice = findSlice(key, hub.value);

        for (const route of Object.keys(features)) {
          const feature = features[route];
          const featureParent = slice[route];
          feature(featureParent);
        }
      })
    )
    .subscribe();
}
