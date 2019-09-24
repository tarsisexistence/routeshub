import { Routes } from '@angular/router';
import { PRIVATE_NOTES_KEY } from '../constants';
import { connectFeatures } from './connect-features';
import { getRegisteredUnits, getUnit } from './get-unit';
import { createFeature, createRoot } from '../creators';

describe('[Getters]: Unit', () => {
  const appRoutes: Routes = [{ path: '' }, { path: '**' }, { path: 'map' }];
  const mapRoutes: Routes = [{ path: '' }];

  describe('getUnit', () => {
    it('should get unit by name', () => {
      createRoot(appRoutes);
      expect(getUnit('app')).toEqual({
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

    it('should get unit by key', () => {
      const APP_NOTES_KEY = Symbol();
      createRoot(appRoutes, { key: APP_NOTES_KEY });
      expect(getUnit(APP_NOTES_KEY)).toEqual({
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

    it('should get unit for feature creator and return created unit', () => {
      createRoot(appRoutes);
      const mapConnector = createFeature(mapRoutes);
      connectFeatures('app', { map: mapConnector });

      expect(getUnit('map')).toEqual({
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

  describe('getRegisteredUnits', () => {
    it('should return hub with root unit', () => {
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
      expect(getRegisteredUnits()).toEqual(result);
    });

    it('should create hub with root and feature', () => {
      createRoot(appRoutes);
      const mapConnector = createFeature(mapRoutes);
      connectFeatures('app', { map: mapConnector });
      expect(getRegisteredUnits()).toEqual({
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
});
