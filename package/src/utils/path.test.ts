import { isWildcard, transformPathToState } from './path';

describe('[utils] path', () => {
  describe('transformPathToState', () => {
    test('should return state from one path with starting slash', () => {
      expect(transformPathToState('/home')).toEqual(['/', 'home']);
    });

    test('should return state from one path with end slash', () => {
      expect(transformPathToState('home/')).toEqual(['/', 'home']);
    });

    test('should return state from one path with slashes', () => {
      expect(transformPathToState('/home/')).toEqual(['/', 'home']);
    });

    describe('when state is default', () => {
      test('should return base state when input is empty route', () => {
        expect(transformPathToState('')).toEqual(['/']);
      });

      test('should return base state when input is empty slash', () => {
        expect(transformPathToState('/')).toEqual(['/']);
      });

      test('should return state from one path', () => {
        expect(transformPathToState('home')).toEqual(['/', 'home']);
      });

      test('should return state from nested path', () => {
        expect(transformPathToState('/location/map/path')).toEqual([
          '/',
          'location',
          'map',
          'path'
        ]);
      });
    });

    describe('when state is custom', () => {
      test('should return base state when input is empty route', () => {
        expect(transformPathToState('', ['/', 'custom'])).toEqual([
          '/',
          'custom'
        ]);
      });

      test('should return base state when input is empty slash', () => {
        expect(transformPathToState('/', ['/', 'custom'])).toEqual([
          '/',
          'custom'
        ]);
      });

      test('should return state from one path', () => {
        expect(transformPathToState('home', ['/', 'custom'])).toEqual([
          '/',
          'custom',
          'home'
        ]);
      });

      test('should return state from nested path', () => {
        expect(
          transformPathToState('/location/map/path', ['/', 'custom'])
        ).toEqual(['/', 'custom', 'location', 'map', 'path']);
      });
    });
  });

  describe('isWildcard', () => {
    test('should not be wildcard when one star', () => {
      expect(isWildcard('*')).toBeFalsy();
    });

    test('should be wildcard when double-star', () => {
      expect(isWildcard('**')).toBeTruthy();
    });
  });
});
