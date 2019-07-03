import { Routes } from '@angular/router';
import { PRIVATE_NOTES_KEY } from '../constants';
import { connectFeatures } from './connect-features';
import { getHubSlices, getSlice } from './get-slice';
import { createFeature, createRoot } from '../creators';

describe('Slice Getters', () => {
  const appRoutes: Routes = [{ path: '' }, { path: '**' }, { path: 'map' }];
  const mapRoutes: Routes = [{ path: '' }];

  describe('getHubSlices', () => {
    it('should return hub with root slice', () => {
      createRoot(appRoutes);
      const result = {
        app: {
          root: {
            id: 0,
            parentId: null,
            state: ['/'],
            path: '',
            name: 'root'
          },
          wildcard: {
            id: 1,
            parentId: null,
            state: ['**'],
            path: '**',
            name: 'wildcard'
          },
          map: {
            id: 2,
            parentId: null,
            state: ['/', 'map'],
            path: 'map',
            name: 'map'
          },
          [PRIVATE_NOTES_KEY]: 'app'
        }
      };
      expect(getHubSlices()).toEqual(result);
    });

    it('should create hub with root and feature', () => {
      createRoot(appRoutes);
      const mapSlice = createFeature(mapRoutes);
      connectFeatures('app', { map: mapSlice });
      expect(getHubSlices()).toEqual({
        app: {
          root: {
            id: 0,
            parentId: null,
            state: ['/'],
            path: '',
            name: 'root'
          },
          wildcard: {
            id: 1,
            parentId: null,
            state: ['**'],
            path: '**',
            name: 'wildcard'
          },
          map: {
            id: 2,
            parentId: null,
            state: ['/', 'map'],
            path: 'map',
            name: 'map'
          },
          [PRIVATE_NOTES_KEY]: 'app'
        },
        map: {
          root: {
            id: 3,
            parentId: 2,
            state: ['/', 'map'],
            path: '',
            name: 'root'
          },
          [PRIVATE_NOTES_KEY]: 'map'
        }
      });
    });
  });

  describe('getSlice', () => {
    it('should get slice by name', () => {
      createRoot(appRoutes);
      expect(getSlice('app')).toEqual({
        root: {
          id: 0,
          parentId: null,
          state: ['/'],
          path: '',
          name: 'root'
        },
        wildcard: {
          id: 1,
          parentId: null,
          state: ['**'],
          path: '**',
          name: 'wildcard'
        },
        map: {
          id: 2,
          parentId: null,
          state: ['/', 'map'],
          path: 'map',
          name: 'map'
        },
        [PRIVATE_NOTES_KEY]: 'app'
      });
    });

    it('should get slice by key', () => {
      const APP_NOTES_KEY = Symbol();
      createRoot(appRoutes, { key: APP_NOTES_KEY });
      expect(getSlice(APP_NOTES_KEY)).toEqual({
        root: {
          id: 0,
          parentId: null,
          state: ['/'],
          path: '',
          name: 'root'
        },
        wildcard: {
          id: 1,
          parentId: null,
          state: ['**'],
          path: '**',
          name: 'wildcard'
        },
        map: {
          id: 2,
          parentId: null,
          state: ['/', 'map'],
          path: 'map',
          name: 'map'
        },
        [PRIVATE_NOTES_KEY]: APP_NOTES_KEY
      });
    });

    it('should get slice for feature creator and return created slice', () => {
      createRoot(appRoutes);
      const mapSlice = createFeature(mapRoutes);
      connectFeatures('app', { map: mapSlice });

      expect(getSlice('map')).toEqual({
        root: {
          id: 3,
          parentId: 2,
          state: ['/', 'map'],
          path: '',
          name: 'root'
        },
        [PRIVATE_NOTES_KEY]: 'map'
      });
    });
  });
});
