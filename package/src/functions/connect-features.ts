import { finalize, find } from 'rxjs/operators';
import { Slice, Slices, Structure } from '../interfaces';
import { hub } from '../hub';
import { PRIVATE_HUB_KEY } from '../constants';

/**
 * returns slice by key
 * from the second slices arg
 */
const findSlice = (parentKey, slices: Slices<any>): Slice<any> | null =>
  Object.values(slices || {}).find(
    (slice: Slice<any>) => slice[PRIVATE_HUB_KEY] === parentKey
  );

/**
 * gives optional keys from main and children routes of slice
 */
type partialFeatureRoutes<K> = {
  [key in keyof Partial<K>]: (parentRoute: Structure) => Slice<any>
};

/**
 * connects feature slices
 * to parent slice
 */
export const connectFeatures = <R = any, C = {}>(
  parentKey,
  features: partialFeatureRoutes<R & C>
): void => {
  hub
    .asObservable()
    .pipe(
      find((slices: Slices<any>) => Boolean(findSlice(parentKey, slices))),
      finalize(() => {
        const slice: Slice<any> = findSlice(parentKey, hub.value);

        for (const route of Object.keys(features)) {
          const feature = features[route];
          const featureParent = slice[route];
          feature(featureParent);
        }
      })
    )
    .subscribe();
};
