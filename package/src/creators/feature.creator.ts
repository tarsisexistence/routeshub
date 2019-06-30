import { Route } from '@angular/router';
import {
  DefaultRouteName,
  LazySlices,
  Notes,
  Slice,
  Structure
} from '../interfaces';
import { hub, updateHub } from '../hub';
import { createNote } from './note.creator';
import { createSlice } from './slice.creator';
import { assignCreatorArgs } from '../utils/name';

/**
 * Creates a feature route
 */
export function createFeature<R = any, C = {}>(
  routes: Route[],
  detachedFeatures?: LazySlices,
  ...args: (symbol | DefaultRouteName)[]
): (parentRoute: Structure, alternativeName?: string) => Slice<R & C> {
  return (parentRoute: Structure, alternativeName?: string): Slice<R & C> => {
    const name = alternativeName ? alternativeName : parentRoute.name;
    const { key, options } = assignCreatorArgs(args, name);
    const notes: Notes<R> = createNote<R>(routes, options);
    const feature: Slice<R> = createSlice<R, C>(parentRoute, notes);
    const updatedRouteState: Slice<Slice<R, C | {}>> = updateHub<R>(
      feature,
      name || alternativeName,
      key || alternativeName
    );
    hub.next(updatedRouteState);

    Object.keys(detachedFeatures || {}).forEach((featureName: string) => {
      detachedFeatures[featureName](parentRoute, featureName);
    });

    return hub.value[name];
  };
}
