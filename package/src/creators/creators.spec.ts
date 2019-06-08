import { Routes } from '@angular/router';
import { createRoot } from './create-root';
import { createNote } from './create-note';
import { reset } from '../utils/reset';

// tslint:disable:max-line-length
describe('createRoot', () => {
  afterEach(() => {
    reset();
  });

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
        lazy: null,
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
        lazy: null,
        name: 'root',
        children: null
      },
      wildcard: {
        id: 1,
        parentId: null,
        state: ['**'],
        path: '**',
        lazy: null,
        name: 'wildcard',
        children: null
      },
      map: {
        id: 2,
        parentId: null,
        state: ['/', 'map'],
        path: 'map',
        lazy: null,
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
        lazy: null,
        name: 'root',
        children: null
      },
      about: {
        id: 2,
        parentId: 1,
        state: ['/', 'about'],
        path: 'about',
        lazy: 'app/views/about/about.module#AboutModule',
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
            // tslint:disable-next-line:max-line-length
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
        lazy: null,
        name: 'root',
        children: null
      },
      about: {
        id: 2,
        parentId: 1,
        state: ['/', 'about'],
        path: 'about',
        lazy: 'app/views/about/about.module#AboutModule',
        name: 'about',
        children: null
      },
      map: {
        id: 4,
        parentId: null,
        state: ['/', 'map'],
        path: '',
        lazy: null,
        name: 'map',
        children: null
      },
      location: {
        id: 5,
        parentId: 4,
        state: ['/', 'map', 'location'],
        path: 'location',
        lazy: 'app/views/map/views/location/location.module#LocationModule',
        name: 'location',
        children: null
      },
      info: {
        id: 6,
        parentId: null,
        state: ['/', 'info'],
        path: 'info',
        lazy: 'app/views/info/info.module#InfoModule',
        name: 'info',
        children: null
      },
      wildcard: {
        id: 7,
        parentId: null,
        state: ['**'],
        path: '**',
        lazy: null,
        name: 'wildcard',
        children: null
      }
    };
    expect(slice).toEqual(result);
  });
});
