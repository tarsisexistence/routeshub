// tslint:disable:max-classes-per-file
// tslint:disable:max-line-length
import { Routes } from '@angular/router';
import { Secluded } from './secluded.decorator';
import { createFeature, createRoot } from '../creators';
import { PRIVATE_NOTES_KEY } from '../constants';
import { connectFeatures } from '../functions/connect-features';

describe('[DECORATOR]: Secluded', () => {
  describe('when create simple unit', () => {
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

    it('should get unit by name', () => {
      createRoot(routes);

      class Example {
        @Secluded('app')
        prop;
      }

      const instance = new Example();
      expect(instance.prop).toEqual(getResult('app'));
    });

    it('should get unit by key', () => {
      const APP_NOTES_KEY = Symbol();
      createRoot(routes, { key: APP_NOTES_KEY });

      class Example {
        @Secluded(APP_NOTES_KEY)
        prop;
      }

      const instance = new Example();
      expect(instance.prop).toEqual(getResult(APP_NOTES_KEY));
    });
  });

  describe('when create feature units', () => {
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

    it('should get feature unit by name', () => {
      createRoot(appRoutes);
      const mapUnit = createFeature(mapRoutes);
      connectFeatures('app', { map: mapUnit });

      class Example {
        @Secluded('map')
        prop;
      }

      const instance = new Example();
      expect(instance.prop).toEqual(getResult('map'));
    });

    it('should get feature unit by key', () => {
      const APP_NOTES_KEY = Symbol();
      const MAP_NOTES_KEY = Symbol();

      createRoot(appRoutes, { key: APP_NOTES_KEY });
      const mapUnit = createFeature(mapRoutes, { key: MAP_NOTES_KEY });
      connectFeatures(APP_NOTES_KEY, { map: mapUnit });

      class Example {
        @Secluded(MAP_NOTES_KEY)
        prop;
      }

      const instance = new Example();
      expect(instance.prop).toEqual(getResult(MAP_NOTES_KEY));
    });
  });
});
