import { createRoot } from './createRoot';
import { reset } from '../utils/reset';

/* tslint:disable:max-line-length */
describe('createRoot', () => {
  afterEach(() => {
    reset();
  });

  it('should create the simplest hub', () => {
    const notes = { root: { path: '' } };
    const slice = createRoot(notes);
    const result = {
      root: {
        id: 0,
        parentId: null,
        state: ['/'],
        path: '',
        lazy: null,
        routeName: 'root',
        children: null
      }
    };
    expect(slice).toEqual(result);
  });

  it('should create a hub with a few routes', () => {
    const notes = {
      root: { path: '' },
      notFound: { path: '**' },
      map: { path: 'map' }
    };
    const slice = createRoot(notes);
    const result = {
      root: {
        id: 0,
        parentId: null,
        state: ['/'],
        path: '',
        lazy: null,
        routeName: 'root',
        children: null
      },
      notFound: {
        id: 1,
        parentId: null,
        state: ['**'],
        path: '**',
        lazy: null,
        routeName: 'notFound',
        children: null
      },
      map: {
        id: 2,
        parentId: null,
        state: ['/', 'map'],
        path: 'map',
        lazy: null,
        routeName: 'map',
        children: null
      }
    };
    expect(slice).toEqual(result);
  });

  it('should create a hub with route that has children', () => {
    const notes = {
      root: {
        path: '',
        children: {
          root: {
            path: ''
          },
          about: {
            path: 'about',
            lazy: 'app/views/about/about.module#AboutModule'
          }
        }
      }
    };
    const slice = createRoot(notes);
    const result = {
      root: {
        id: 1,
        parentId: null,
        state: ['/'],
        path: '',
        lazy: null,
        routeName: 'root',
        children: null
      },
      about: {
        id: 2,
        parentId: 1,
        state: ['/', 'about'],
        path: 'about',
        lazy: 'app/views/about/about.module#AboutModule',
        routeName: 'about',
        children: null
      }
    };
    expect(slice).toEqual(result);
  });

  it('should create a hub with routes and children', () => {
    const notes = {
      root: {
        path: '',
        children: {
          root: {
            path: ''
          },
          about: {
            path: 'about',
            lazy: 'app/views/about/about.module#AboutModule'
          }
        }
      },
      map: {
        path: 'map',
        children: {
          root: {
            path: ''
          },
          location: {
            path: 'location',
            lazy: 'app/views/map/views/location/location.module#LocationModule'
          }
        }
      },
      info: {
        path: 'info',
        lazy: 'app/views/info/info.module#InfoModule'
      },
      notFound: { path: '**' }
    };
    const slice = createRoot(notes);
    const result = {
      root: {
        id: 1,
        parentId: null,
        state: ['/'],
        path: '',
        lazy: null,
        routeName: 'root',
        children: null
      },
      about: {
        id: 2,
        parentId: 1,
        state: ['/', 'about'],
        path: 'about',
        lazy: 'app/views/about/about.module#AboutModule',
        routeName: 'about',
        children: null
      },
      map: {
        id: 4,
        parentId: null,
        state: ['/', 'map'],
        path: '',
        lazy: null,
        routeName: 'map',
        children: null
      },
      location: {
        id: 5,
        parentId: 4,
        state: ['/', 'map', 'location'],
        path: 'location',
        lazy: 'app/views/map/views/location/location.module#LocationModule',
        routeName: 'location',
        children: null
      },
      info: {
        id: 6,
        parentId: null,
        state: ['/', 'info'],
        path: 'info',
        lazy: 'app/views/info/info.module#InfoModule',
        routeName: 'info',
        children: null
      },
      notFound: {
        id: 7,
        parentId: null,
        state: ['**'],
        path: '**',
        lazy: null,
        routeName: 'notFound',
        children: null
      }
    };
    expect(slice).toEqual(result);
  });
});
