import { Routes } from '@angular/router';
import { createRoot } from './root.creator';
import { PRIVATE_HUB_KEY } from '../constants';

// tslint:disable:max-line-length
describe('createRoot', () => {
  it('should create root', () => {
    const routes: Routes = [{ path: '' }];
    const slice = createRoot({ routes });
    const result = {
      root: {
        id: 0,
        parentId: null,
        state: ['/'],
        path: '',
        name: 'root',
        children: null
      },
      [PRIVATE_HUB_KEY]: 'app'
    };
    expect(slice).toEqual(result);
  });

  it('should create root with a few routes', () => {
    const routes: Routes = [{ path: '' }, { path: '**' }, { path: 'map' }];
    const slice = createRoot({ routes });
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
      },
      [PRIVATE_HUB_KEY]: 'app'
    };
    expect(slice).toEqual(result);
  });

  it('should create root with one route and children', () => {
    const routes: Routes = [
      { path: '', children: [{ path: '' }, { path: 'about' }] }
    ];
    const slice = createRoot({ routes });
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
      [PRIVATE_HUB_KEY]: 'app'
    };
    expect(slice).toEqual(result);
  });

  it('should create root with dynamic multi paths', () => {
    const routes: Routes = [
      { path: '' },
      { path: 'users/:user' },
      { path: ':country' },
      { path: 'place/road' }
    ];
    const slice = createRoot({ routes });
    const result = {
      root: {
        id: 0,
        parentId: null,
        state: ['/'],
        path: '',
        name: 'root',
        children: null
      },
      user: {
        id: 1,
        parentId: null,
        state: ['/', 'users', ':user'],
        path: 'users/:user',
        name: 'user',
        children: null
      },
      country: {
        id: 2,
        parentId: null,
        state: ['/', ':country'],
        path: ':country',
        name: 'country',
        children: null
      },
      road: {
        id: 3,
        parentId: null,
        state: ['/', 'place', 'road'],
        path: 'place/road',
        name: 'road',
        children: null
      },
      [PRIVATE_HUB_KEY]: 'app'
    };
    expect(slice).toEqual(result);
  });

  it('should create root with dynamic multi paths in children', () => {
    const routes: Routes = [
      {
        path: '',
        children: [
          { path: '' },
          { path: 'users/:user' },
          { path: ':country' },
          { path: 'place/road' }
        ]
      }
    ];
    const slice = createRoot({ routes });
    const result = {
      root: {
        id: 1,
        parentId: null,
        state: ['/'],
        path: '',
        name: 'root',
        children: null
      },
      user: {
        id: 2,
        parentId: 1,
        state: ['/', 'users', ':user'],
        path: 'users/:user',
        name: 'user',
        children: null
      },
      country: {
        id: 3,
        parentId: 1,
        state: ['/', ':country'],
        path: ':country',
        name: 'country',
        children: null
      },
      road: {
        id: 4,
        parentId: 1,
        state: ['/', 'place', 'road'],
        path: 'place/road',
        name: 'road',
        children: null
      },
      [PRIVATE_HUB_KEY]: 'app'
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
    const slice = createRoot({ routes });
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
      },
      [PRIVATE_HUB_KEY]: 'app'
    };
    expect(slice).toEqual(result);
  });

  it('should create root Hub with different dynamic paths', () => {
    const routes: Routes = [
      { path: 'map' },
      { path: 'map/:id' },
      { path: ':token/profile' }
    ];
    const slice = createRoot({ routes });
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
      },
      [PRIVATE_HUB_KEY]: 'app'
    };
    expect(slice).toEqual(result);
  });
});
