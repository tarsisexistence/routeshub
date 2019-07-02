import { Route, Routes } from '@angular/router';
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
export function createFeature<R = any, C = any>(
  routes: Routes,
  { key, detached, routeName }: Partial<CreatorOptionArgs> = {}
): LazySlice<R, C> {
  return (
    parentStructure: Structure,
    alternativeName?: string
  ): Slice<R, C> => {
    const name = alternativeName ? alternativeName : parentStructure.name;
    const notes: Notes<R, C> = createNote<R, C>(routes, routeName);
    const feature: Slice<R, C> = createSlice<R, C>(parentStructure, notes);
    const updatedRouteState: Slices<Slice<R, C>> = updateHub<R, C>(
      feature,
      name,
      key || name
    );
    hub.next(updatedRouteState);

    connectDetached(detached, parentStructure);

    return hub.value[name];
  };
}
