import { Routes } from '@angular/router';
import { createRoot } from './create-root';
import { createNote } from './create-note';
import { createFeature } from './create-feature';
import { reset } from '../utils/reset';

// tslint:disable:max-line-length
describe('creators', () => {
  afterEach(() => {
    reset();
  });

  describe('createRoot', () => {
    it('should create the simplest hub', () => {
      const routes: Routes = [{ path: '' }];
      const note = createNote(routes);
      const slice = createRoot(note);
      const result = {
        root: {
          id: 0,
          parentId: null,
          state: ['/'],
          path: '',
          name: 'root',
          children: null
        }
      };
      expect(slice).toEqual(result);
    });

    it('should create a hub with a few routes', () => {
      const routes: Routes = [{ path: '' }, { path: '**' }, { path: 'map' }];
      const note = createNote(routes);
      const slice = createRoot(note);
      const result = {
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
        }
      };
      expect(slice).toEqual(result);
    });

    it('should create a hub with route that has children', () => {
      const routes: Routes = [
        {
          path: '',
          children: [
            {
              path: ''
            },
            {
              path: 'about',
              loadChildren: 'app/views/about/about.module#AboutModule'
            }
          ]
        }
      ];
      const note = createNote(routes);
      const slice = createRoot(note);
      const result = {
        root: {
          id: 1,
          parentId: null,
          state: ['/'],
          path: '',
          name: 'root',
          children: null
        },
        about: {
          id: 2,
          parentId: 1,
          state: ['/', 'about'],
          path: 'about',
          name: 'about',
          children: null
        }
      };
      expect(slice).toEqual(result);
    });

    it('should create a hub with routes and children', () => {
      const routes: Routes = [
        {
          path: '',
          children: [
            {
              path: ''
            },
            {
              path: 'about',
              loadChildren: 'app/views/about/about.module#AboutModule'
            }
          ]
        },
        {
          path: 'map',
          children: [
            {
              path: ''
            },
            {
              path: 'location',
              loadChildren:
                'app/views/map/views/location/location.module#LocationModule'
            }
          ]
        },
        {
          path: 'info',
          loadChildren: 'app/views/info/info.module#InfoModule'
        },
        { path: '**' }
      ];
      const note = createNote(routes);
      const slice = createRoot(note);
      const result = {
        root: {
          id: 1,
          parentId: null,
          state: ['/'],
          path: '',
          name: 'root',
          children: null
        },
        about: {
          id: 2,
          parentId: 1,
          state: ['/', 'about'],
          path: 'about',
          name: 'about',
          children: null
        },
        map: {
          id: 4,
          parentId: null,
          state: ['/', 'map'],
          path: '',
          name: 'map',
          children: null
        },
        location: {
          id: 5,
          parentId: 4,
          state: ['/', 'map', 'location'],
          path: 'location',
          name: 'location',
          children: null
        },
        info: {
          id: 6,
          parentId: null,
          state: ['/', 'info'],
          path: 'info',
          name: 'info',
          children: null
        },
        wildcard: {
          id: 7,
          parentId: null,
          state: ['**'],
          path: '**',
          name: 'wildcard',
          children: null
        }
      };
      expect(slice).toEqual(result);
    });
  });

  describe('createFeature', () => {
    it('should create feature with one route', () => {
      const appRoutes: Routes = [{ path: '' }, { path: '**' }, { path: 'map' }];
      const appNote = createNote(appRoutes);
      const appSlice = createRoot(appNote);
      const mapRoutes: Routes = [{ path: '' }];
      const mapNote = createNote(mapRoutes);
      const mapSlice = createFeature(appSlice.map, mapNote);
      const result = {
        root: {
          id: 3,
          parentId: 2,
          state: ['/', 'map'],
          path: '',
          name: 'root',
          children: null
        }
      };
      expect(mapSlice).toEqual(result);
    });

    it('should create feature with a few routes', () => {
      const appRoutes: Routes = [{ path: '' }, { path: '**' }, { path: 'map' }];
      const appNote = createNote(appRoutes);
      const appSlice = createRoot(appNote);

      const mapRoutes: Routes = [
        { path: '' },
        { path: 'location' },
        { path: ':profileId' }
      ];
      const mapNote = createNote(mapRoutes);
      const mapSlice = createFeature(appSlice.map, mapNote);
      const result = {
        root: {
          id: 3,
          parentId: 2,
          state: ['/', 'map'],
          path: '',
          name: 'root',
          children: null
        },
        location: {
          id: 4,
          parentId: 2,
          state: ['/', 'map', 'location'],
          path: 'location',
          name: 'location',
          children: null
        },
        profileId: {
          id: 5,
          parentId: 2,
          state: ['/', 'map', ':profileId'],
          path: ':profileId',
          name: 'profileId',
          children: null
        }
      };
      expect(mapSlice).toEqual(result);
    });

    it('should create feature with a few routes', () => {
      const appRoutes: Routes = [{ path: '' }, { path: '**' }, { path: 'map' }];
      const appNote = createNote(appRoutes);
      const appSlice = createRoot(appNote);
      const mapRoutes: Routes = [{ path: '' }, { path: 'location' }];
      const mapNote = createNote(mapRoutes);
      const mapSlice = createFeature(appSlice.map, mapNote);
      const locationRoutes: Routes = [{ path: '' }];
      const locationNote = createNote(locationRoutes);
      const locationSlice = createFeature(mapSlice.location, locationNote);
      const result = {
        root: {
          id: 5,
          parentId: 4,
          state: ['/', 'map', 'location'],
          path: '',
          name: 'root',
          children: null
        }
      };
      expect(locationSlice).toEqual(result);
    });
  });
});
