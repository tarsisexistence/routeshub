import { finalize, find } from 'rxjs/operators';
import { Slice, Slices, Structure } from '../interfaces';
import { hub } from '../hub';
import { PRIVATE_HUB_KEY } from '../constants';

const findSlice = (parentKey, slices: Slices<any>) =>
  Object.values(slices || {}).find(
    (slice: Slice<any>) => slice[PRIVATE_HUB_KEY] === parentKey
  );

type possibleFeatures<K> = {
  [key in keyof Partial<K>]: (parentRoute: Structure) => Slice<any>
};

export const connectFeatures = <R = any, C = {}>(
  parentKey,
  features: possibleFeatures<R & C>
): void => {
  hub
    .asObservable()
    .pipe(
      find((slices: Slices<any>) => Boolean(findSlice(parentKey, slices))),
      finalize(() => {
        const slice: Slice<any> = findSlice(parentKey, hub.value);
        for (const route of Object.keys(features)) {
          const feature = features[route];
          const child = slice[route];
          feature(child);
        }
      })
    )
    .subscribe();
};
