import { Route } from '@angular/router';
import {
  CreatorOptionArgs,
  LazySlice,
  Notes,
  Slice,
  Slices,
  Structure
} from '../interfaces';
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
  routeNames
}: { routes: Route[] } & Partial<CreatorOptionArgs>): LazySlice<R, C> {
  return (
    parentStructure: Structure,
    alternativeName?: string
  ): Slice<R, C> => {
    const name = alternativeName ? alternativeName : parentStructure.name;
    const notes: Notes<R> = createNote<R>(routes, routeNames);
    const feature: Slice<R> = createSlice<R, C>(parentStructure, notes);
    const updatedRouteState: Slices<Slice<R, C | {}>> = updateHub<R>(
      feature,
      name,
      key || name
    );
    hub.next(updatedRouteState);

    connectDetached(detachedFeatures, parentStructure);

    return hub.value[name];
  };
}
