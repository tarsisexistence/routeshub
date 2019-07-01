import { Routes } from '@angular/router';
import { PRIVATE_HUB_KEY } from '../constants';
import { connectFeatures } from './connect-features';
import { getHubSlices, getSlice } from './get-slice';
import { createFeature, createRoot } from '../creators';

describe('Slice Getters', () => {
  const appRoutes: Routes = [{ path: '' }, { path: '**' }, { path: 'map' }];
  const mapRoutes: Routes = [{ path: '' }];

  describe('getHubSlices', () => {
    it('should return hub with root slice', () => {
      createRoot({ routes: appRoutes });
      const result = {
        app: {
          root: {
            id: 0,
            parentId: null,
            state: ['/'],
            path: '',
            name: 'root',
            children: null
          },
          wildcard: {
            id: 1,
            parentId: null,
            state: ['**'],
            path: '**',
            name: 'wildcard',
            children: null
          },
          map: {
            id: 2,
            parentId: null,
            state: ['/', 'map'],
            path: 'map',
            name: 'map',
            children: null
          },
          [PRIVATE_HUB_KEY]: 'app'
        }
      };
      expect(getHubSlices()).toEqual(result);
    });

    it('should create hub with root and feature', () => {
      createRoot({ routes: appRoutes });
      const mapSlice = createFeature({ routes: mapRoutes });
      connectFeatures('app', { map: mapSlice });
      expect(getHubSlices()).toEqual({
        app: {
          root: {
            id: 0,
            parentId: null,
            state: ['/'],
            path: '',
            name: 'root',
            children: null
          },
          wildcard: {
            id: 1,
            parentId: null,
            state: ['**'],
            path: '**',
            name: 'wildcard',
            children: null
          },
          map: {
            id: 2,
            parentId: null,
            state: ['/', 'map'],
            path: 'map',
            name: 'map',
            children: null
          },
          [PRIVATE_HUB_KEY]: 'app'
        },
        map: {
          root: {
            id: 3,
            parentId: 2,
            state: ['/', 'map'],
            path: '',
            name: 'root',
            children: null
          },
          [PRIVATE_HUB_KEY]: 'map'
        }
      });
    });
  });

  describe('getSlice', () => {
    it('should get slice by name', () => {
      createRoot({ routes: appRoutes });
      expect(getSlice('app')).toEqual({
        root: {
          id: 0,
          parentId: null,
          state: ['/'],
          path: '',
          name: 'root',
          children: null
        },
        wildcard: {
          id: 1,
          parentId: null,
          state: ['**'],
          path: '**',
          name: 'wildcard',
          children: null
        },
        map: {
          id: 2,
          parentId: null,
          state: ['/', 'map'],
          path: 'map',
          name: 'map',
          children: null
        },
        [PRIVATE_HUB_KEY]: 'app'
      });
    });

    it('should get slice by key', () => {
      const APP_HUB_KEY = Symbol();
      createRoot({ routes: appRoutes, key: APP_HUB_KEY });
      expect(getSlice(APP_HUB_KEY)).toEqual({
        root: {
          id: 0,
          parentId: null,
          state: ['/'],
          path: '',
          name: 'root',
          children: null
        },
        wildcard: {
          id: 1,
          parentId: null,
          state: ['**'],
          path: '**',
          name: 'wildcard',
          children: null
        },
        map: {
          id: 2,
          parentId: null,
          state: ['/', 'map'],
          path: 'map',
          name: 'map',
          children: null
        },
        [PRIVATE_HUB_KEY]: APP_HUB_KEY
      });
    });

    it('should get slice for feature creator and return created slice', () => {
      createRoot({ routes: appRoutes });
      const mapSlice = createFeature({ routes: mapRoutes });
      connectFeatures('app', { map: mapSlice });

      expect(getSlice('map')).toEqual({
        root: {
          id: 3,
          parentId: 2,
          state: ['/', 'map'],
          path: '',
          name: 'root',
          children: null
        },
        [PRIVATE_HUB_KEY]: 'map'
      });
    });
  });
});