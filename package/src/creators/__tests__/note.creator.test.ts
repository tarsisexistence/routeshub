import { Routes } from '@angular/router';
import { createNote } from '../note.creator';

// tslint:disable:max-line-length
describe('createNote', () => {
  it('should create note with root and wildcard', () => {
    const routes: Routes = [{ path: '' }, { path: '**' }];
    const note = createNote(routes);
    const result = {
      root: { path: '', name: 'root' },
      wildcard: { path: '**', name: 'wildcard' }
    };
    expect(note).toEqual(result);
  });

  it('should create note with children', () => {
    const routes: Routes = [
      { path: '', children: [{ path: '' }, { path: 'map' }] },
      { path: '**' }
    ];
    const note = createNote(routes);
    const result = {
      root: {
        path: '',
        name: 'root',
        children: {
          root: { path: '', name: 'root' },
          map: { path: 'map', name: 'map' }
        }
      },
      wildcard: { path: '**', name: 'wildcard' }
    };
    expect(note).toEqual(result);
  });

  it('should create note custom root and wildcard names', () => {
    const routes: Routes = [{ path: '' }, { path: '**' }];
    const note = createNote(routes, { root: 'home', wildcard: 'notFound' });
    const result = {
      home: { path: '', name: 'home' },
      notFound: { path: '**', name: 'notFound' }
    };
    expect(note).toEqual(result);
  });

  it('should create note with multi paths', () => {
    const routes: Routes = [
      { path: 'users' },
      { path: 'user/id' },
      { path: 'user/id/token' }
    ];
    const note = createNote(routes);
    const result = {
      users: { path: 'users', name: 'users' },
      id: { path: 'user/id', name: 'id' },
      token: { path: 'user/id/token', name: 'token' }
    };
    expect(note).toEqual(result);
  });

  it('should create note with dynamic paths', () => {
    const routes: Routes = [{ path: 'users' }, { path: ':city' }];
    const note = createNote(routes);
    const result = {
      users: { path: 'users', name: 'users' },
      city: { path: ':city', name: 'city' }
    };
    expect(note).toEqual(result);
  });

  it('should create note with dynamic multi paths', () => {
    const routes: Routes = [
      { path: ':user' },
      { path: 'country/:city' },
      { path: 'user/:id/:token' }
    ];
    const note = createNote(routes);
    const result = {
      user: { path: ':user', name: 'user' },
      city: { path: 'country/:city', name: 'city' },
      token: { path: 'user/:id/:token', name: 'token' }
    };
    expect(note).toEqual(result);
  });

  it('should create note with underscore paths', () => {
    const routes: Routes = [{ path: 'first_name' }, { path: 'last_name' }];
    const note = createNote(routes);
    const result = {
      firstName: { path: 'first_name', name: 'firstName' },
      lastName: { path: 'last_name', name: 'lastName' }
    };
    expect(note).toEqual(result);
  });

  it('should create note with dash paths', () => {
    const routes: Routes = [{ path: 'first-name' }, { path: 'last-name' }];
    const note = createNote(routes);
    const result = {
      firstName: { path: 'first-name', name: 'firstName' },
      lastName: { path: 'last-name', name: 'lastName' }
    };
    expect(note).toEqual(result);
  });

  it('should create note with multi, underscore, dash and dynamic paths', () => {
    const routes: Routes = [
      { path: '' },
      { path: 'user-name' },
      { path: 'user_surname' },
      { path: 'user-name/:firstName' },
      { path: 'user_surname/:lastName' },
      { path: ':city_id' },
      { path: ':city-name' },
      { path: ':cityId/place' }
    ];
    const note = createNote(routes);
    const result = {
      root: { path: '', name: 'root' },
      userName: { path: 'user-name', name: 'userName' },
      userSurname: { path: 'user_surname', name: 'userSurname' },
      firstName: { path: 'user-name/:firstName', name: 'firstName' },
      lastName: { path: 'user_surname/:lastName', name: 'lastName' },
      cityId: { path: ':city_id', name: 'cityId' },
      cityName: { path: ':city-name', name: 'cityName' },
      place: { path: ':cityId/place', name: 'place' }
    };
    expect(note).toEqual(result);
  });
});
