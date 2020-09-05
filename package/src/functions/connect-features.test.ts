import { Routes } from '@angular/router';
import { connectFeatures } from './connect-features';
import { getRegisteredUnits, getUnit } from './get-unit';
import { createFeature, createRoot } from '../creators';
import { PRIVATE_NOTES_KEY } from '../constants';

describe('connectFeatures', () => {
  const appRoutes: Routes = [{ path: '' }, { path: 'map' }];
  const mapRoutes: Routes = [{ path: '' }];

  it('should contain root and feature', () => {
    createRoot(appRoutes);
    const mapConnector = createFeature(mapRoutes);
    connectFeatures('app', { map: mapConnector });
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
    expect(getRegisteredUnits()).toEqual(result);
  });

  it('should invoke connectFeatures by route name', () => {
    createRoot(appRoutes);
    const mapConnector = createFeature(mapRoutes);
    connectFeatures('app', { map: mapConnector });
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
    expect(getUnit('map')).toEqual(result);
  });

  it('should invoke connectFeatures by key', () => {
    const APP_NOTES_KEY = Symbol();
    createRoot(appRoutes, { key: APP_NOTES_KEY });
    const mapConnector = createFeature(mapRoutes);
    connectFeatures(APP_NOTES_KEY, { map: mapConnector });
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
    expect(getUnit('map')).toEqual(result);
  });
});
