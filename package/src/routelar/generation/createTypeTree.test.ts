import { createTypeTree } from './createTypeTree';

describe('[generation] createTypeTree', () => {
  describe('createTypeTree', () => {
    test('should match for empty routes', () => {
      expect(createTypeTree({})).toMatchSnapshot();
    });

    test('should match for example routes', () => {
      expect(
        createTypeTree({
          root: ['/'],
          home: ['/', 'home'],
          about: ['/', 'about'],
          car: ['/', 'car'],
          details: ['/', 'details'],
          info: ['/', 'info'],

          engine: {
            ':year': ['/', 'engine', 'string']
          },

          users: {
            root: ['/', 'users'],
            ':id': {
              root: ['/', 'users', 'string'],
              profile: ['/', 'users', 'string', 'profile']
            }
          }
        })
      ).toMatchSnapshot();
    });

    test('should match for more difficult example routes', () => {
      expect(
        createTypeTree({
          home: ['/', 'home'],
          users: {
            root: ['/', 'users'],
            ':id': {
              profile: ['/', 'users', 'string', 'profile'],
              settings: ['/', 'users', 'string', 'settings']
            }
          },
          admin: {
            root: ['/', 'admin'],
            collaborators: ['/', 'admin', 'collaborators'],
            ':id': ['/', 'admin', 'string']
          },
          pages: {
            root: ['/', 'pages'],
            articles: {
              today: ['/', 'pages', 'articles', 'today'],
              ':date': ['/', 'pages', 'articles', 'string']
            }
          }
        })
      ).toMatchSnapshot();
    });
  });
});
