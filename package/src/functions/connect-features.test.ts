import { Routes } from '@angular/router';
import { connectFeatures, createFeature, createRoot } from 'lib';
import { PRIVATE_HUB_KEY } from '../constants';
import { getSlice } from './get-slice';

describe('connectFeatures', () => {
  const appRoutes: Routes = [{ path: '' }, { path: 'map' }];
  const mapRoutes: Routes = [{ path: '' }];

  it('should invoke connectFeatures by name', () => {
    createRoot({ routes: appRoutes });
    const mapSlice = createFeature({ routes: mapRoutes });
    connectFeatures('app', { map: mapSlice });
    const result = {
      root: {
        id: 2,
        parentId: 1,
        state: ['/', 'map'],
        path: '',
        name: 'root',
        children: null
      },
      [PRIVATE_HUB_KEY]: 'map'
    };
    expect(getSlice('map')).toEqual(result);
  });

  it('should invoke connectFeatures by key', () => {
    const APP_HUB_KEY = Symbol();
    createRoot({ routes: appRoutes, key: APP_HUB_KEY });
    const mapSlice = createFeature({ routes: mapRoutes });
    connectFeatures(APP_HUB_KEY, { map: mapSlice });
    const result = {
      root: {
        id: 2,
        parentId: 1,
        state: ['/', 'map'],
        path: '',
        name: 'root',
        children: null
      },
      [PRIVATE_HUB_KEY]: 'map'
    };
    expect(getSlice('map')).toEqual(result);
  });

  it('should invoke connectFeatures by slice', () => {
    const appSlice = createRoot({ routes: appRoutes });
    const mapSlice = createFeature({ routes: mapRoutes });
    connectFeatures(appSlice, { map: mapSlice });
    const result = {
      root: {
        id: 2,
        parentId: 1,
        state: ['/', 'map'],
        path: '',
        name: 'root',
        children: null
      },
      [PRIVATE_HUB_KEY]: 'map'
    };
    expect(getSlice('map')).toEqual(result);
  });

  it('should invoke connectFeatures by hidden key prop', () => {
    const appSlice = createRoot({ routes: appRoutes });
    const mapSlice = createFeature({ routes: mapRoutes });
    connectFeatures(appSlice[PRIVATE_HUB_KEY], { map: mapSlice });
    const result = {
      root: {
        id: 2,
        parentId: 1,
        state: ['/', 'map'],
        path: '',
        name: 'root',
        children: null
      },
      [PRIVATE_HUB_KEY]: 'map'
    };
    expect(getSlice('map')).toEqual(result);
  });
});
