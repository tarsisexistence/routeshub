// tslint:disable:max-line-length
import { Routes } from '@angular/router';
import { createRoot } from './root.creator';
import { createFeature } from './feature.creator';
import { PRIVATE_HUB_KEY } from '../constants';
import { connectFeatures, getSlice } from '../functions';

describe('createFeature', () => {
  it('should create feature with one route', () => {
    const appRoutes: Routes = [{ path: '' }, { path: '**' }, { path: 'map' }];
    createRoot({ routes: appRoutes });
    const mapRoutes: Routes = [{ path: '' }];
    const mapSlice = createFeature({ routes: mapRoutes });
    connectFeatures('app', { map: mapSlice });
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
    expect(getSlice('map')).toEqual(result);
  });

  it('should create feature with one route with different name options', () => {
    const appRoutes: Routes = [{ path: '' }, { path: '**' }, { path: 'map' }];
    createRoot({ routes: appRoutes, routeNames: { root: 'rootRoute' } });
    const mapRoutes: Routes = [{ path: '' }];
    const mapSlice = createFeature({
      routes: mapRoutes,
      routeNames: { root: 'home' }
    });
    connectFeatures('app', { map: mapSlice });
    const result = {
      home: {
        id: 3,
        parentId: 2,
        state: ['/', 'map'],
        path: '',
        name: 'home',
        children: null
      },
      [PRIVATE_HUB_KEY]: 'map'
    };
    expect(getSlice('map')).toEqual(result);
  });

  it('should create feature with a few routes', () => {
    const appRoutes: Routes = [{ path: '' }, { path: '**' }, { path: 'map' }];
    createRoot({ routes: appRoutes });
    const mapRoutes: Routes = [
      { path: '' },
      { path: 'location' },
      { path: ':profileId' }
    ];
    const mapSlice = createFeature({ routes: mapRoutes });
    connectFeatures('app', { map: mapSlice });
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
    expect(getSlice('map')).toEqual(result);
  });

  it('should create feature with a few another features', () => {
    const appRoutes: Routes = [{ path: '' }, { path: '**' }, { path: 'map' }];
    createRoot({ routes: appRoutes });
    const mapRoutes: Routes = [{ path: '' }, { path: 'location' }];
    const mapSlice = createFeature({ routes: mapRoutes });
    connectFeatures('app', { map: mapSlice });
    const locationRoutes: Routes = [{ path: '' }];
    const locationSlice = createFeature({ routes: locationRoutes });
    connectFeatures('map', { location: locationSlice });
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
    expect(getSlice('location')).toEqual(result);
  });
});
