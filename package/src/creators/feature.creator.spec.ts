import { Routes } from '@angular/router';
import { createRoot } from './root.creator';
import { createFeature } from './feature.creator';
import { reset } from '../utils/reset';
import { PRIVATE_HUB_KEY } from '../constants';

describe('createFeature', () => {
  afterEach(reset);

  it('should create feature with one route', () => {
    const appRoutes: Routes = [{ path: '' }, { path: '**' }, { path: 'map' }];
    const appSlice = createRoot(appRoutes);
    const mapRoutes: Routes = [{ path: '' }];
    const mapSlice = createFeature(appSlice.map, mapRoutes);
    const result = {
      root: {
        id: 3,
        parentId: 2,
        state: ['/', 'map'],
        path: '',
        name: 'root',
        children: null
      },
      [PRIVATE_HUB_KEY]: 'map'
    };
    expect(mapSlice).toEqual(result);
  });

  it('should create feature with a few routes', () => {
    const appRoutes: Routes = [{ path: '' }, { path: '**' }, { path: 'map' }];
    const appSlice = createRoot(appRoutes);

    const mapRoutes: Routes = [
      { path: '' },
      { path: 'location' },
      { path: ':profileId' }
    ];
    const mapSlice = createFeature(appSlice.map, mapRoutes);
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
      },
      [PRIVATE_HUB_KEY]: 'map'
    };
    expect(mapSlice).toEqual(result);
  });

  it('should create feature with a few routes', () => {
    const appRoutes: Routes = [{ path: '' }, { path: '**' }, { path: 'map' }];
    const appSlice = createRoot(appRoutes);
    const mapRoutes: Routes = [{ path: '' }, { path: 'location' }];
    const mapSlice = createFeature(appSlice.map, mapRoutes);
    const locationRoutes: Routes = [{ path: '' }];
    const locationSlice = createFeature(mapSlice.location, locationRoutes);
    const result = {
      root: {
        id: 5,
        parentId: 4,
        state: ['/', 'map', 'location'],
        path: '',
        name: 'root',
        children: null
      },
      [PRIVATE_HUB_KEY]: 'location'
    };
    expect(locationSlice).toEqual(result);
  });
});
