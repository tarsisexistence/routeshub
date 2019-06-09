import { Routes } from '@angular/router';
import { createNote } from './note.creator';
import { createRoot } from './root.creator';
import { createUnion } from './union.creator';
import { reset } from 'lib/src/utils/reset';
import { createFeature } from 'lib/src/creators/feature.creator';

describe('createNote', () => {
  afterEach(() => {
    reset();
  });

  it('should create create union with one slice', () => {
    const routes: Routes = [{ path: '' }, { path: '**' }];
    const note = createNote(routes);
    const app = createRoot(note);
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
        }
      }
    };
    expect(union).toEqual(result);
  });

  it('should create create union with few routes', () => {
    const routes: Routes = [{ path: '' }, { path: 'map' }];
    const note = createNote(routes);
    const app = createRoot(note);
    const mapRoutes: Routes = [{ path: '' }, { path: 'location' }];
    const mapNote = createNote(mapRoutes);
    const map = createFeature(app.map, mapNote);
    const locationRoutes: Routes = [{ path: '' }];
    const locationNote = createNote(locationRoutes);
    const location = createFeature(map.location, locationNote);
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
        }
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
        }
      },
      location: {
        root: {
          id: 4,
          parentId: 3,
          state: ['/', 'map', 'location'],
          path: '',
          name: 'root',
          children: null
        }
      }
    };
    expect(union).toEqual(result);
  });
});
