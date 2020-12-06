import { Routes } from '@angular/router';
import { getRegisteredUnits } from './get-unit';
import { createFeature, createRoot } from '../creators';
import { connectFeatures } from './connect-features';
import { PRIVATE_NOTES_KEY } from '../constants';

describe('connectNearby', () => {
  it('should contain root and nearby feature', () => {
    const appRoutes: Routes = [{ path: '' }, { path: 'map' }];
    const aboutRoutes: Routes = [{ path: 'about' }];
    const aboutConnector = createFeature(aboutRoutes);
    createRoot(appRoutes, { nearby: { about: aboutConnector } });
    const result = {
      app: {
        root: {
          id: 0,
          parentId: null,
          state: ['/'],
          path: '',
          name: 'root'
        },
        map: {
          id: 1,
          parentId: null,
          state: ['/', 'map'],
          path: 'map',
          name: 'map'
        },
        [PRIVATE_NOTES_KEY]: 'app'
      },
      about: {
        about: {
          id: 2,
          parentId: null,
          state: ['/', 'about'],
          path: 'about',
          name: 'about'
        },
        [PRIVATE_NOTES_KEY]: 'about'
      }
    };
    expect(getRegisteredUnits()).toEqual(result);
  });

  it('should contain root with attached and nearby features', () => {
    const appRoutes: Routes = [{ path: '' }, { path: 'map' }];
    const mapRoutes: Routes = [{ path: '' }];
    const aboutRoutes: Routes = [{ path: 'about' }];
    const aboutConnector = createFeature(aboutRoutes);
    const mapConnector = createFeature(mapRoutes);
    const APP_NOTES_KEY = Symbol();
    createRoot(appRoutes, {
      key: APP_NOTES_KEY,
      nearby: { about: aboutConnector }
    });
    connectFeatures(APP_NOTES_KEY, { map: mapConnector });
    const result = {
      app: {
        root: {
          id: 0,
          parentId: null,
          state: ['/'],
          path: '',
          name: 'root'
        },
        map: {
          id: 1,
          parentId: null,
          state: ['/', 'map'],
          path: 'map',
          name: 'map'
        },
        [PRIVATE_NOTES_KEY]: APP_NOTES_KEY
      },
      about: {
        about: {
          id: 2,
          parentId: null,
          state: ['/', 'about'],
          path: 'about',
          name: 'about'
        },
        [PRIVATE_NOTES_KEY]: 'about'
      },
      map: {
        root: {
          id: 3,
          parentId: 1,
          state: ['/', 'map'],
          path: '',
          name: 'root'
        },
        [PRIVATE_NOTES_KEY]: 'map'
      }
    };
    expect(getRegisteredUnits()).toEqual(result);
  });

  it('should contain root, nearby feature with attached inside', () => {
    const appRoutes: Routes = [{ path: '' }];
    const mapRoutes: Routes = [{ path: '' }];
    const aboutRoutes: Routes = [{ path: 'about' }, { path: 'map' }];
    const aboutConnector = createFeature(aboutRoutes);
    const mapConnector = createFeature(mapRoutes);
    connectFeatures('about', { map: mapConnector });
    createRoot(appRoutes, { nearby: { about: aboutConnector } });
    const result = {
      app: {
        root: {
          id: 0,
          parentId: null,
          state: ['/'],
          path: '',
          name: 'root'
        },
        [PRIVATE_NOTES_KEY]: 'app'
      },
      about: {
        about: {
          id: 1,
          parentId: null,
          state: ['/', 'about'],
          path: 'about',
          name: 'about'
        },
        map: {
          id: 2,
          parentId: null,
          state: ['/', 'map'],
          path: 'map',
          name: 'map'
        },
        [PRIVATE_NOTES_KEY]: 'about'
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
    };
    expect(getRegisteredUnits()).toEqual(result);
  });

  it('should contain root and nearby feature in another nearby feature', () => {
    const appRoutes: Routes = [{ path: '' }];
    const aboutRoutes: Routes = [{ path: 'about' }];
    const mapRoutes: Routes = [{ path: 'map' }];
    const mapConnector = createFeature(mapRoutes);
    const aboutConnector = createFeature(aboutRoutes, {
      nearby: { map: mapConnector }
    });
    createRoot(appRoutes, { nearby: { about: aboutConnector } });
    const result = {
      app: {
        root: {
          id: 0,
          parentId: null,
          state: ['/'],
          path: '',
          name: 'root'
        },
        [PRIVATE_NOTES_KEY]: 'app'
      },
      about: {
        about: {
          id: 1,
          parentId: null,
          state: ['/', 'about'],
          path: 'about',
          name: 'about'
        },
        [PRIVATE_NOTES_KEY]: 'about'
      },
      map: {
        map: {
          id: 2,
          parentId: null,
          state: ['/', 'map'],
          path: 'map',
          name: 'map'
        },
        [PRIVATE_NOTES_KEY]: 'map'
      }
    };
    expect(getRegisteredUnits()).toEqual(result);
  });
});
