import { Routes } from '@angular/router';
import { createNote } from './note.creator';
import { createSlice } from './slice.creator';
import { Structure } from '../interfaces/common.interfaces';

describe('createSlice', () => {
  it('should create basic without parent', () => {
    const routes: Routes = [{ path: '' }];
    const notes = createNote(routes);
    const result = {
      root: {
        id: 0,
        name: 'root',
        parentId: null,
        path: '',
        state: ['/']
      }
    };
    expect(createSlice(null, notes)).toEqual(result);
  });

  it('should create slice of few routes', () => {
    const routes: Routes = [{ path: '' }, { path: 'about' }, { path: 'map' }];
    const notes = createNote(routes);
    const result = {
      root: {
        id: 0,
        name: 'root',
        parentId: null,
        path: '',
        state: ['/']
      },
      about: {
        id: 1,
        name: 'about',
        parentId: null,
        path: 'about',
        state: ['/', 'about']
      },
      map: {
        id: 2,
        name: 'map',
        parentId: null,
        path: 'map',
        state: ['/', 'map']
      }
    };
    expect(createSlice(null, notes)).toEqual(result);
  });

  it('should create slice of few routes with parent', () => {
    const parentStructure: Structure = {
      id: 0,
      parentId: null,
      state: ['/', 'admin'],
      name: 'root',
      path: ''
    };
    const routes: Routes = [{ path: '' }, { path: 'about' }, { path: 'map' }];
    const notes = createNote(routes);
    const result = {
      root: {
        id: 0,
        name: 'root',
        parentId: 0,
        path: '',
        state: ['/', 'admin']
      },
      about: {
        id: 1,
        name: 'about',
        parentId: 0,
        path: 'about',
        state: ['/', 'admin', 'about']
      },
      map: {
        id: 2,
        name: 'map',
        parentId: 0,
        path: 'map',
        state: ['/', 'admin', 'map']
      }
    };
    expect(createSlice(parentStructure, notes)).toEqual(result);
  });
});
