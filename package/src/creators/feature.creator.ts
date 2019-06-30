import { Route } from '@angular/router';
import { CreatorOptionArgs, Notes, Slice, Structure } from '../interfaces';
import { hub, updateHub } from '../hub';
import { createNote } from './note.creator';
import { createSlice } from './slice.creator';
import { connectDetached } from '../functions';

/**
 * Creates a feature route
 */
export function createFeature<R = any, C = {}>({
  routes,
  key,
  detachedFeatures,
  nameOptions
}: { routes: Route[] } & Partial<CreatorOptionArgs>): (
  parentRoute: Structure,
  alternativeName?: string
) => Slice<R & C> {
  return (parentRoute: Structure, alternativeName?: string): Slice<R & C> => {
    const name = alternativeName ? alternativeName : parentRoute.name;
    key = key || name;
    const notes: Notes<R> = createNote<R>(routes, nameOptions);
    const feature: Slice<R> = createSlice<R, C>(parentRoute, notes);
    const updatedRouteState: Slice<Slice<R, C | {}>> = updateHub<R>(
      feature,
      name,
      key
    );
    hub.next(updatedRouteState);

    Object.keys(detachedFeatures || {}).forEach((featureName: string) => {
      detachedFeatures[featureName](parentRoute, featureName);
    });

    connectDetached(detachedFeatures, parentRoute);

    return hub.value[name];
  };
}
