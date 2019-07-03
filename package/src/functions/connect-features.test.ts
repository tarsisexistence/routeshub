import { Routes } from '@angular/router';
import { connectFeatures } from './connect-features';
import { getHubSlices, getSlice } from './get-slice';
import { createFeature, createRoot } from '../creators';
import { PRIVATE_NOTES_KEY } from '../constants';

describe('connectFeatures', () => {
  const appRoutes: Routes = [{ path: '' }, { path: 'map' }];
  const mapRoutes: Routes = [{ path: '' }];

  it('should contain root and feature', () => {
    createRoot(appRoutes);
    const mapSlice = createFeature(mapRoutes);
    connectFeatures('app', { map: mapSlice });
    const result = {
      app: {
        root: {
          id: 0,
          parentId: null,
          state: ['/'],
          path: '',
          name: 'root'
        },
        map: {
          id: 1,
          parentId: null,
          state: ['/', 'map'],
          path: 'map',
          name: 'map'
        },
        [PRIVATE_NOTES_KEY]: 'app'
      },
      map: {
        root: {
          id: 2,
          parentId: 1,
          state: ['/', 'map'],
          path: '',
          name: 'root'
        },
        [PRIVATE_NOTES_KEY]: 'map'
      }
    };
    expect(getHubSlices()).toEqual(result);
  });

  it('should invoke connectFeatures by route name', () => {
    createRoot(appRoutes);
    const mapSlice = createFeature(mapRoutes);
    connectFeatures('app', { map: mapSlice });
    const result = {
      root: {
        id: 2,
        parentId: 1,
        state: ['/', 'map'],
        path: '',
        name: 'root'
      },
      [PRIVATE_NOTES_KEY]: 'map'
    };
    expect(getSlice('map')).toEqual(result);
  });

  it('should invoke connectFeatures by key', () => {
    const APP_NOTES_KEY = Symbol();
    createRoot(appRoutes, { key: APP_NOTES_KEY });
    const mapSlice = createFeature(mapRoutes);
    connectFeatures(APP_NOTES_KEY, { map: mapSlice });
    const result = {
      root: {
        id: 2,
        parentId: 1,
        state: ['/', 'map'],
        path: '',
        name: 'root'
      },
      [PRIVATE_NOTES_KEY]: 'map'
    };
    expect(getSlice('map')).toEqual(result);
  });
});
