import { Routes } from '@angular/router';
import { createRoot } from './root.creator';
import { PRIVATE_NOTES_KEY } from '../constants';

// tslint:disable:max-line-length
describe('createRoot', () => {
  it('should create root', () => {
    const routes: Routes = [{ path: '' }];
    const unit = createRoot(routes);
    const result = {
      root: {
        id: 0,
        parentId: null,
        state: ['/'],
        path: '',
        name: 'root'
      },
      [PRIVATE_NOTES_KEY]: 'app'
    };
    expect(unit).toEqual(result);
  });

  it('should create root with key', () => {
    const routes: Routes = [{ path: '' }];
    const ROOT_NOTES_KEY = Symbol();
    const unit = createRoot(routes, { key: ROOT_NOTES_KEY });
    const result = {
      root: {
        id: 0,
        parentId: null,
        state: ['/'],
        path: '',
        name: 'root'
      },
      [PRIVATE_NOTES_KEY]: ROOT_NOTES_KEY
    };
    expect(unit).toEqual(result);
  });

  it('should create root with a few routes', () => {
    const routes: Routes = [{ path: '' }, { path: '**' }, { path: 'map' }];
    const unit = createRoot(routes);
    const result = {
      root: {
        id: 0,
        parentId: null,
        state: ['/'],
        path: '',
        name: 'root'
      },
      wildcard: {
        id: 1,
        parentId: null,
        state: ['**'],
        path: '**',
        name: 'wildcard'
      },
      map: {
        id: 2,
        parentId: null,
        state: ['/', 'map'],
        path: 'map',
        name: 'map'
      },
      [PRIVATE_NOTES_KEY]: 'app'
    };
    expect(unit).toEqual(result);
  });

  it('should create root with one route and children', () => {
    const routes: Routes = [
      { path: '', children: [{ path: '' }, { path: 'about' }] }
    ];
    const unit = createRoot(routes);
    const result = {
      root: {
        id: 1,
        parentId: null,
        state: ['/'],
        path: '',
        name: 'root'
      },
      about: {
        id: 2,
        parentId: 1,
        state: ['/', 'about'],
        path: 'about',
        name: 'about'
      },
      [PRIVATE_NOTES_KEY]: 'app'
    };
    expect(unit).toEqual(result);
  });

  it('should create root unit with wildcard and root with children and routeName option', () => {
    const routes: Routes = [
      { path: '', children: [{ path: '' }, { path: 'about' }] },
      { path: '**' }
    ];
    const unit = createRoot(routes, {
      routeName: { root: 'home', wildcard: 'notFound' }
    });
    const result = {
      home: {
        id: 1,
        parentId: null,
        state: ['/'],
        path: '',
        name: 'home'
      },
      about: {
        id: 2,
        parentId: 1,
        state: ['/', 'about'],
        path: 'about',
        name: 'about'
      },
      notFound: {
        id: 3,
        parentId: null,
        state: ['**'],
        path: '**',
        name: 'notFound'
      },
      [PRIVATE_NOTES_KEY]: 'app'
    };
    expect(unit).toEqual(result);
  });

  it('should create root with dynamic multi paths', () => {
    const routes: Routes = [
      { path: '' },
      { path: 'users/:user' },
      { path: ':country' },
      { path: 'place/road' }
    ];
    const unit = createRoot(routes);
    const result = {
      root: {
        id: 0,
        parentId: null,
        state: ['/'],
        path: '',
        name: 'root'
      },
      user: {
        id: 1,
        parentId: null,
        state: ['/', 'users', ':user'],
        path: 'users/:user',
        name: 'user'
      },
      country: {
        id: 2,
        parentId: null,
        state: ['/', ':country'],
        path: ':country',
        name: 'country'
      },
      road: {
        id: 3,
        parentId: null,
        state: ['/', 'place', 'road'],
        path: 'place/road',
        name: 'road'
      },
      [PRIVATE_NOTES_KEY]: 'app'
    };
    expect(unit).toEqual(result);
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
    const unit = createRoot(routes);
    const result = {
      root: {
        id: 1,
        parentId: null,
        state: ['/'],
        path: '',
        name: 'root'
      },
      user: {
        id: 2,
        parentId: 1,
        state: ['/', 'users', ':user'],
        path: 'users/:user',
        name: 'user'
      },
      country: {
        id: 3,
        parentId: 1,
        state: ['/', ':country'],
        path: ':country',
        name: 'country'
      },
      road: {
        id: 4,
        parentId: 1,
        state: ['/', 'place', 'road'],
        path: 'place/road',
        name: 'road'
      },
      [PRIVATE_NOTES_KEY]: 'app'
    };
    expect(unit).toEqual(result);
  });

  it('should create root with routes and children', () => {
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
    const unit = createRoot(routes);
    const result = {
      root: {
        id: 1,
        parentId: null,
        state: ['/'],
        path: '',
        name: 'root'
      },
      about: {
        id: 2,
        parentId: 1,
        state: ['/', 'about'],
        path: 'about',
        name: 'about'
      },
      map: {
        id: 4,
        parentId: null,
        state: ['/', 'map'],
        path: '',
        name: 'map'
      },
      location: {
        id: 5,
        parentId: 4,
        state: ['/', 'map', 'location'],
        path: 'location',
        name: 'location'
      },
      info: {
        id: 6,
        parentId: null,
        state: ['/', 'info'],
        path: 'info',
        name: 'info'
      },
      wildcard: {
        id: 7,
        parentId: null,
        state: ['**'],
        path: '**',
        name: 'wildcard'
      },
      [PRIVATE_NOTES_KEY]: 'app'
    };
    expect(unit).toEqual(result);
  });

  it('should create root Hub with different dynamic paths', () => {
    const routes: Routes = [
      { path: 'map' },
      { path: 'map/:id' },
      { path: ':token/profile' }
    ];
    const unit = createRoot(routes);
    const result = {
      map: {
        id: 0,
        parentId: null,
        state: ['/', 'map'],
        path: 'map',
        name: 'map'
      },
      id: {
        id: 1,
        parentId: null,
        state: ['/', 'map', ':id'],
        path: 'map/:id',
        name: 'id'
      },
      profile: {
        id: 2,
        parentId: null,
        state: ['/', ':token', 'profile'],
        path: ':token/profile',
        name: 'profile'
      },
      [PRIVATE_NOTES_KEY]: 'app'
    };
    expect(unit).toEqual(result);
  });
});
