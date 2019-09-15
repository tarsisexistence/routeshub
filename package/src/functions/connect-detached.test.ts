// tslint:disable:max-line-length
import { Routes } from '@angular/router';
import { getRegisteredUnits } from './get-unit';
import { createFeature, createRoot } from '../creators';
import { connectFeatures } from './connect-features';
import { PRIVATE_NOTES_KEY } from '../constants';

describe('connectDetached', () => {
  it('should contain root and detached feature', () => {
    const appRoutes: Routes = [{ path: '' }, { path: 'map' }];
    const aboutRoutes: Routes = [{ path: 'about' }];
    const aboutUnit = createFeature(aboutRoutes);
    createRoot(appRoutes, { detached: { about: aboutUnit } });
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

  it('should contain root with attached and detached features', () => {
    const appRoutes: Routes = [{ path: '' }, { path: 'map' }];
    const mapRoutes: Routes = [{ path: '' }];
    const aboutRoutes: Routes = [{ path: 'about' }];
    const aboutUnit = createFeature(aboutRoutes);
    const mapUnit = createFeature(mapRoutes);
    const APP_NOTES_KEY = Symbol();
    createRoot(appRoutes, {
      key: APP_NOTES_KEY,
      detached: { about: aboutUnit }
    });
    connectFeatures(APP_NOTES_KEY, { map: mapUnit });
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

  it('should contain root, detached feature with attached inside', () => {
    const appRoutes: Routes = [{ path: '' }];
    const mapRoutes: Routes = [{ path: '' }];
    const aboutRoutes: Routes = [{ path: 'about' }, { path: 'map' }];
    const aboutUnit = createFeature(aboutRoutes);
    const mapUnit = createFeature(mapRoutes);
    connectFeatures('about', { map: mapUnit });
    createRoot(appRoutes, { detached: { about: aboutUnit } });
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

  it('should contain root and detached feature in another detached feature', () => {
    const appRoutes: Routes = [{ path: '' }];
    const aboutRoutes: Routes = [{ path: 'about' }];
    const mapRoutes: Routes = [{ path: 'map' }];
    const mapUnit = createFeature(mapRoutes);
    const aboutUnit = createFeature(aboutRoutes, {
      detached: { map: mapUnit }
    });
    createRoot(appRoutes, { detached: { about: aboutUnit } });
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
