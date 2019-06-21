import { Routes } from '@angular/router';
import { createFeature } from './feature.creator';
import { createRoot } from './root.creator';
import { createUnion } from './union.creator';
import { PRIVATE_HUB_KEY } from '../constants';

describe('createUnion', () => {
  it('should create create union with one Hub', () => {
    const routes: Routes = [{ path: '' }, { path: '**' }];
    const app = createRoot(routes);
    const union = createUnion({ app });
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
        [PRIVATE_HUB_KEY]: 'app'
      }
    };
    expect(union).toEqual(result);
  });

  it('should create create union with few routes', () => {
    const routes: Routes = [{ path: '' }, { path: 'map' }];
    const app = createRoot(routes);
    const mapRoutes: Routes = [{ path: '' }, { path: 'location' }];
    const map = createFeature(app.map, mapRoutes);
    const locationRoutes: Routes = [{ path: '' }];
    const location = createFeature(map.location, locationRoutes);
    const union = createUnion({
      app,
      map,
      location
    });

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
        map: {
          id: 1,
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
          id: 2,
          parentId: 1,
          state: ['/', 'map'],
          path: '',
          name: 'root',
          children: null
        },
        location: {
          id: 3,
          parentId: 1,
          state: ['/', 'map', 'location'],
          path: 'location',
          name: 'location',
          children: null
        },
        [PRIVATE_HUB_KEY]: 'map'
      },
      location: {
        root: {
          id: 4,
          parentId: 3,
          state: ['/', 'map', 'location'],
          path: '',
          name: 'root',
          children: null
        },
        [PRIVATE_HUB_KEY]: 'location'
      }
    };
    expect(union).toEqual(result);
  });
});
