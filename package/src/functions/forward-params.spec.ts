// tslint:disable:max-line-length
import { Routes } from '@angular/router';
import { createRoot } from '../creators/root.creator';
import { forwardParams } from './';

describe('forwardParams', () => {
  it('should return the same state', () => {
    const appRoutes: Routes = [{ path: 'map' }];
    const appSlice = createRoot(appRoutes);
    const state = forwardParams(appSlice.map.state);
    expect(state).toBe(appSlice.map.state);
  });

  it('should return the same state with fake parameters', () => {
    const appRoutes: Routes = [{ path: 'map' }];
    const appSlice = createRoot(appRoutes);
    const state = forwardParams(appSlice.map.state, { id: 1 });
    expect(state).toEqual(appSlice.map.state);
  });

  it('should return the same unparameterized state with fake parameters', () => {
    const appRoutes: Routes = [{ path: ':map' }];
    const appSlice = createRoot(appRoutes);
    const state = forwardParams(appSlice.map.state, { id: 1 });
    expect(state).toEqual(['/', ':map']);
  });

  it('should return new parameterized state', () => {
    const appRoutes: Routes = [{ path: ':map' }];
    const appSlice = createRoot(appRoutes);
    const state = forwardParams(appSlice.map.state, { map: 'world' });
    expect(state).toEqual(['/', 'world']);
  });

  it('should return new parameterized state with double path', () => {
    const appRoutes: Routes = [{ path: 'maps/:map' }];
    const appSlice = createRoot(appRoutes);
    const state = forwardParams(appSlice.map.state, { map: 'world' });
    expect(state).toEqual(['/', 'maps', 'world']);
  });

  it('should return new parameterized state with reverted the same double path', () => {
    const appRoutes: Routes = [{ path: ':map/map' }];
    const appSlice = createRoot(appRoutes);
    const state = forwardParams(appSlice.map.state, { map: 'world' });
    expect(state).toEqual(['/', 'world', 'map']);
  });
});
