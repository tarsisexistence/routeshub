import { proxy } from './proxy';

describe('core', () => {
  describe('proxy', () => {
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
      expect(Array.from(proxy.one.one.one)).toEqual(['/', 'one', 'one', 'one']);
    });

    test('should return path with Array.prototype.map', () => {
      expect(Array.from(proxy.one.map)).toEqual(['/', 'one', 'map']);
    });
  });
});
