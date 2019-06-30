import { Route } from '@angular/router';
import {
  DefaultRouteNames,
  LazySlices,
  Notes,
  Slice,
  Structure
} from '../interfaces';
import { hub, updateHub } from '../hub';
import { createNote } from './note.creator';
import { createSlice } from './slice.creator';

/**
 * possible args
 * in root/feature creators
 */
interface CreatorArgs {
  detachedFeatures: LazySlices;
  routeNames: DefaultRouteNames;
  key: symbol | string;
}

/**
 * Creates a feature route
 */
export function createFeature<R = any, C = {}>({
  routes,
  key,
  detachedFeatures,
  routeNames
}: { routes: Route[] } & Partial<CreatorArgs>): (
  parentRoute: Structure,
  alternativeName?: string
) => Slice<R & C> {
  return (parentRoute: Structure, alternativeName?: string): Slice<R & C> => {
    const name = alternativeName ? alternativeName : parentRoute.name;
    key = key || name;
    const notes: Notes<R> = createNote<R>(routes, routeNames);
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

    return hub.value[name];
  };
}
