import { createRoot } from './createRoot';
import { reset } from '../utils/reset';

/* tslint:disable:max-line-length */
describe('createRoot', () => {
  afterEach(() => {
    reset();
  });

  it('should create a simple hub with basic and small configuration', () => {
    const notes = { root: { path: '' } };
    const appSlice: any = createRoot(notes);
    const result = {
      root: {
        id: 0,
        parentId: null,
        state: ['/'],
        stateFn: Function,
        path: '',
        lazy: null,
        routeName: 'root',
        children: null
      }
    };
    expect(JSON.stringify(appSlice)).toBe(JSON.stringify(result));
  });

  it('should create a simple hub with a few routes', () => {
    const notes = {
      root: { path: '' },
      notFound: { path: '**' },
      map: { path: 'map' }
    };
    const appSlice: any = createRoot(notes);
    const result = {
      root: {
        id: 0,
        parentId: null,
        state: ['/'],
        stateFn: Function,
        path: '',
        lazy: null,
        routeName: 'root',
        children: null
      },
      notFound: {
        id: 1,
        parentId: null,
        state: ['**'],
        stateFn: Function,
        path: '**',
        lazy: null,
        routeName: 'notFound',
        children: null
      },
      map: {
        id: 2,
        parentId: null,
        state: ['/', 'map'],
        stateFn: Function,
        path: 'map',
        lazy: null,
        routeName: 'map',
        children: null
      }
    };
    expect(JSON.stringify(appSlice)).toBe(JSON.stringify(result));
  });
});
