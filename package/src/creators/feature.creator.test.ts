// tslint:disable:max-line-length
import { Routes } from '@angular/router';
import { createRoot } from './root.creator';
import { createFeature } from './feature.creator';
import { PRIVATE_NOTES_KEY } from '../constants';
import { connectFeatures, getRegisteredUnits, getUnit } from '../functions';

describe('createFeature', () => {
  it('should create feature with one route', () => {
    const appRoutes: Routes = [{ path: '' }, { path: '**' }, { path: 'map' }];
    createRoot(appRoutes);
    const mapRoutes: Routes = [{ path: '' }];
    const mapConnector = createFeature(mapRoutes);
    connectFeatures('app', { map: mapConnector });
    const result = {
      root: {
        id: 3,
        parentId: 2,
        state: ['/', 'map'],
        path: '',
        name: 'root'
      },
      [PRIVATE_NOTES_KEY]: 'map'
    };
    expect(getUnit('map')).toEqual(result);
  });

  it('should create root and feature with different route name options', () => {
    const appRoutes: Routes = [{ path: '' }, { path: '**' }, { path: 'map' }];
    const mapRoutes: Routes = [{ path: '' }];
    const mapConnector = createFeature(mapRoutes, {
      routeName: { root: 'home' }
    });
    createRoot(appRoutes, { routeName: { root: 'rootRoute' } });
    connectFeatures('app', { map: mapConnector });
    const result = {
      app: {
        rootRoute: {
          id: 0,
          parentId: null,
          state: ['/'],
          path: '',
          name: 'rootRoute'
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
        home: {
          id: 3,
          parentId: 2,
          state: ['/', 'map'],
          path: '',
          name: 'home'
        },
        [PRIVATE_NOTES_KEY]: 'map'
      }
    };
    expect(getRegisteredUnits()).toEqual(result);
  });

  it('should create feature with a few routes', () => {
    const appRoutes: Routes = [{ path: '' }, { path: '**' }, { path: 'map' }];
    createRoot(appRoutes);
    const mapRoutes: Routes = [
      { path: '' },
      { path: 'location' },
      { path: ':profileId' }
    ];
    const mapConnector = createFeature(mapRoutes);
    connectFeatures('app', { map: mapConnector });
    const result = {
      root: {
        id: 3,
        parentId: 2,
        state: ['/', 'map'],
        path: '',
        name: 'root'
      },
      location: {
        id: 4,
        parentId: 2,
        state: ['/', 'map', 'location'],
        path: 'location',
        name: 'location'
      },
      profileId: {
        id: 5,
        parentId: 2,
        state: ['/', 'map', ':profileId'],
        path: ':profileId',
        name: 'profileId'
      },
      [PRIVATE_NOTES_KEY]: 'map'
    };
    expect(getUnit('map')).toEqual(result);
  });

  it('should create feature with a few another features', () => {
    const appRoutes: Routes = [{ path: '' }, { path: '**' }, { path: 'map' }];
    createRoot(appRoutes);
    const mapRoutes: Routes = [{ path: '' }, { path: 'location' }];
    const mapConnector = createFeature(mapRoutes);
    connectFeatures('app', { map: mapConnector });
    const locationRoutes: Routes = [{ path: '' }];
    const locationConnector = createFeature(locationRoutes);
    connectFeatures('map', { location: locationConnector });
    const result = {
      root: {
        id: 5,
        parentId: 4,
        state: ['/', 'map', 'location'],
        path: '',
        name: 'root'
      },
      [PRIVATE_NOTES_KEY]: 'location'
    };
    expect(getUnit('location')).toEqual(result);
  });
});
