// tslint:disable:max-line-length
import { proxy } from './proxy';

describe('core', () => {
  describe('proxy', () => {
    describe('for output', () => {
      test('should return default path', () => {
        expect(Array.from(proxy)).toEqual(['/']);
      });

      test('should return first path', () => {
        expect(Array.from(proxy.one)).toEqual(['/', 'one']);
      });

      test('should return two paths', () => {
        expect(Array.from(proxy.one.two)).toEqual(['/', 'one', 'two']);
      });

      test('should return three paths', () => {
        expect(Array.from(proxy.one.two.three)).toEqual([
          '/',
          'one',
          'two',
          'three'
        ]);
      });

      test('should return three paths when values duplicated', () => {
        expect(Array.from(proxy.one.one.one)).toEqual([
          '/',
          'one',
          'one',
          'one'
        ]);
      });

      test('should return path with possible Array.prototype.map', () => {
        expect(Array.from(proxy.one.map)).toEqual(['/', 'one', 'map']);
      });

      test('should return path with prop of possible Array.prototype.map', () => {
        expect(Array.from(proxy.one.map.notMap)).toEqual([
          '/',
          'one',
          'map',
          'notMap'
        ]);
      });
    });

    describe('for type', () => {
      test('should return result of array', () => {
        expect(Array.isArray(proxy)).toBeTruthy();
      });

      test('should return nested result of array', () => {
        expect(Array.isArray(proxy.somePath)).toBeTruthy();
      });

      test('should return nested not Array.prototype.map result of array', () => {
        expect(Array.isArray(proxy.map)).toBeTruthy();
      });

      test('should return nested prop of not Array.prototype.map result of array', () => {
        expect(Array.isArray(proxy.map.someProp)).toBeTruthy();
      });
    });
  });
});
