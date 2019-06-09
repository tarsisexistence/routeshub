import { Routes } from '@angular/router';
import { createRoot } from './root.creator';
import { createNote } from './note.creator';
import { createFeature } from './feature.creator';
import { reset } from '../utils/reset';

describe('createFeature', () => {
  afterEach(() => {
    reset();
  });

  it('should create feature with one route', () => {
    const appRoutes: Routes = [{ path: '' }, { path: '**' }, { path: 'map' }];
    const appNote = createNote(appRoutes);
    const appSlice = createRoot(appNote);
    const mapRoutes: Routes = [{ path: '' }];
    const mapNote = createNote(mapRoutes);
    const mapSlice = createFeature(appSlice.map, mapNote);
    const result = {
      root: {
        id: 3,
        parentId: 2,
        state: ['/', 'map'],
        path: '',
        name: 'root',
        children: null
      }
    };
    expect(mapSlice).toEqual(result);
  });

  it('should create feature with a few routes', () => {
    const appRoutes: Routes = [{ path: '' }, { path: '**' }, { path: 'map' }];
    const appNote = createNote(appRoutes);
    const appSlice = createRoot(appNote);

    const mapRoutes: Routes = [
      { path: '' },
      { path: 'location' },
      { path: ':profileId' }
    ];
    const mapNote = createNote(mapRoutes);
    const mapSlice = createFeature(appSlice.map, mapNote);
    const result = {
      root: {
        id: 3,
        parentId: 2,
        state: ['/', 'map'],
        path: '',
        name: 'root',
        children: null
      },
      location: {
        id: 4,
        parentId: 2,
        state: ['/', 'map', 'location'],
        path: 'location',
        name: 'location',
        children: null
      },
      profileId: {
        id: 5,
        parentId: 2,
        state: ['/', 'map', ':profileId'],
        path: ':profileId',
        name: 'profileId',
        children: null
      }
    };
    expect(mapSlice).toEqual(result);
  });

  it('should create feature with a few routes', () => {
    const appRoutes: Routes = [{ path: '' }, { path: '**' }, { path: 'map' }];
    const appNote = createNote(appRoutes);
    const appSlice = createRoot(appNote);
    const mapRoutes: Routes = [{ path: '' }, { path: 'location' }];
    const mapNote = createNote(mapRoutes);
    const mapSlice = createFeature(appSlice.map, mapNote);
    const locationRoutes: Routes = [{ path: '' }];
    const locationNote = createNote(locationRoutes);
    const locationSlice = createFeature(mapSlice.location, locationNote);
    const result = {
      root: {
        id: 5,
        parentId: 4,
        state: ['/', 'map', 'location'],
        path: '',
        name: 'root',
        children: null
      }
    };
    expect(locationSlice).toEqual(result);
  });
});
