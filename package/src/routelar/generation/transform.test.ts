import { transform } from './transform';

describe('[generation] transform', () => {
  test('should transform routes', () => {
    expect(
      transform({
        home: {},
        root: {
          root: {},
          about: {},
          car: {},
          details: {},
          info: {},
          'engine/:year': {}
        },
        users: { root: {}, ':id': {}, ':id/profile': {} }
      })
    ).toEqual({
      root: ['/'],
      home: ['/', 'home'],
      about: ['/', 'about'],
      car: ['/', 'car'],
      details: ['/', 'details'],
      info: ['/', 'info'],

      'engine/:year': ['/', 'engine/:year'],

      users: {
        root: ['/', 'users'],
        ':id': ['/', 'users', 'string'],
        ':id/profile': ['/', 'users', 'string'] // TODO: fix this later
      }
    });
  });
});
