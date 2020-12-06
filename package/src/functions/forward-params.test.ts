import { Routes } from '@angular/router';
import { forwardParams } from './forward-params';
import { createRoot } from '../creators/root.creator';

describe('forwardParams', () => {
  it('should return the same state', () => {
    const appRoutes: Routes = [{ path: 'map' }];
    const appUnit = createRoot(appRoutes);
    const state = forwardParams(appUnit.map.state);
    expect(state).toBe(appUnit.map.state);
  });

  it('should return the same state with fake parameters', () => {
    const appRoutes: Routes = [{ path: 'map' }];
    const appUnit = createRoot(appRoutes);
    const state = forwardParams(appUnit.map.state, { id: 1 });
    expect(state).toEqual(appUnit.map.state);
  });

  it('should return the same unparameterized state with fake parameters', () => {
    const appRoutes: Routes = [{ path: ':map' }];
    const appUnit = createRoot(appRoutes);
    const state = forwardParams(appUnit.map.state, { id: 1 });
    expect(state).toEqual(['/', ':map']);
  });

  it('should return new parameterized state', () => {
    const appRoutes: Routes = [{ path: ':map' }];
    const appUnit = createRoot(appRoutes);
    const state = forwardParams(appUnit.map.state, { map: 'world' });
    expect(state).toEqual(['/', 'world']);
  });

  it('should return new parameterized state with double path', () => {
    const appRoutes: Routes = [{ path: 'maps/:map' }];
    const appUnit = createRoot(appRoutes);
    const state = forwardParams(appUnit.map.state, { map: 'world' });
    expect(state).toEqual(['/', 'maps', 'world']);
  });

  it('should return new parameterized state with reverted the same double path', () => {
    const appRoutes: Routes = [{ path: ':map/map' }];
    const appUnit = createRoot(appRoutes);
    const state = forwardParams(appUnit.map.state, { map: 'world' });
    expect(state).toEqual(['/', 'world', 'map']);
  });
});
