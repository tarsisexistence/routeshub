import { Routes } from '@angular/router';
import { createRoot } from './root.creator';
import { createNote } from './note.creator';
import { reset } from '../utils/reset';

// tslint:disable:max-line-length
describe('createRoot', () => {
  afterEach(() => {
    reset();
  });

  it('should create root', () => {
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

  it('should create root with a few routes', () => {
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

  it('should create root with one route and children', () => {
    const routes: Routes = [
      { path: '', children: [{ path: '' }, { path: 'about' }] }
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

  it('should create root with routes and children', () => {
    // TODO: think about redundant children
    const routes: Routes = [
      {
        path: '',
        children: [{ path: '' }, { path: 'about' }]
      },
      {
        path: 'map',
        children: [{ path: '' }, { path: 'location' }]
      },
      { path: 'info' },
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

  it('should create root slice with different dynamic paths', () => {
    const routes: Routes = [
      { path: 'map' },
      { path: 'map/:id' },
      { path: ':token/profile' }
    ];
    const note = createNote(routes);
    const slice = createRoot(note);
    const result = {
      map: {
        id: 0,
        parentId: null,
        state: ['/', 'map'],
        path: 'map',
        name: 'map',
        children: null
      },
      id: {
        id: 1,
        parentId: null,
        state: ['/', 'map', ':id'],
        path: 'map/:id',
        name: 'id',
        children: null
      },
      profile: {
        id: 2,
        parentId: null,
        state: ['/', ':token', 'profile'],
        path: ':token/profile',
        name: 'profile',
        children: null
      }
    };
    expect(slice).toEqual(result);
  });
});
