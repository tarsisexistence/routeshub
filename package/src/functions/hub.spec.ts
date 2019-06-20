import { Routes } from '@angular/router';
import { getHubSlices, getSlice } from './';
import { PRIVATE_HUB_KEY } from '../constants';
import { createRoot } from '../creators/root.creator';
import { createFeature } from 'lib';

describe('Hub functions', () => {
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
      const appSlice = createRoot(appRoutes);
      createFeature(appSlice.map, mapRoutes);
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
      createRoot(appRoutes);
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
      createRoot(appRoutes, APP_HUB_KEY);
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
      createRoot(appRoutes);
      createFeature(getSlice('app').map, mapRoutes);

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
