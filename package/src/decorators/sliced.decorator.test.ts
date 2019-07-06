// tslint:disable:max-classes-per-file
// tslint:disable:max-line-length
import { Routes } from '@angular/router';
import { Sliced } from './sliced.decorator';
import { createFeature, createRoot } from '../creators';
import { PRIVATE_NOTES_KEY } from '../constants';
import { connectFeatures } from '../functions/connect-features';

describe('Sliced decorator', () => {
  describe('when create simple slice', () => {
    const routes: Routes = [{ path: '' }];
    const getResult = identifier => ({
      root: {
        id: 0,
        parentId: null,
        state: ['/'],
        path: '',
        name: 'root'
      },
      [PRIVATE_NOTES_KEY]: identifier
    });

    it('should get slice by name', () => {
      createRoot(routes);

      class Example {
        @Sliced('app')
        prop;
      }

      const instance = new Example();
      expect(instance.prop).toEqual(getResult('app'));
    });

    it('should get slice by key', () => {
      const APP_NOTES_KEY = Symbol();
      createRoot(routes, { key: APP_NOTES_KEY });

      class Example {
        @Sliced(APP_NOTES_KEY)
        prop;
      }

      const instance = new Example();
      expect(instance.prop).toEqual(getResult(APP_NOTES_KEY));
    });
  });

  describe('when create feature slices', () => {
    const getResult = identifier => ({
      root: {
        id: 3,
        parentId: 2,
        state: ['/', 'map'],
        path: '',
        name: 'root'
      },
      [PRIVATE_NOTES_KEY]: identifier
    });
    const appRoutes: Routes = [{ path: '' }, { path: '**' }, { path: 'map' }];
    const mapRoutes: Routes = [{ path: '' }];

    it('should get feature slice by name', () => {
      createRoot(appRoutes);
      const mapSlice = createFeature(mapRoutes);
      connectFeatures('app', { map: mapSlice });

      class Example {
        @Sliced('map')
        prop;
      }

      const instance = new Example();
      expect(instance.prop).toEqual(getResult('map'));
    });

    it('should get feature slice by key', () => {
      const APP_NOTES_KEY = Symbol();
      const MAP_NOTES_KEY = Symbol();

      createRoot(appRoutes, { key: APP_NOTES_KEY });
      const mapSlice = createFeature(mapRoutes, { key: MAP_NOTES_KEY });
      connectFeatures(APP_NOTES_KEY, { map: mapSlice });

      class Example {
        @Sliced(MAP_NOTES_KEY)
        prop;
      }

      const instance = new Example();
      expect(instance.prop).toEqual(getResult(MAP_NOTES_KEY));
    });
  });
});
