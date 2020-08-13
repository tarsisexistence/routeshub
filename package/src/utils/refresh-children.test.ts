import { refreshChildren } from './refresh-children';

describe('[utils] refreshChildren', () => {
  test('should modify children into flat structure with single route', () => {
    expect(
      refreshChildren({
        children: {
          root: { parentId: 0, id: 1, name: 'root', path: '', state: ['/'] }
        },
        parentId: null,
        id: 0,
        name: 'root',
        path: '',
        state: ['/']
      })
    ).toEqual({
      root: {
        parentId: null,
        id: 1,
        name: 'root',
        path: '',
        state: ['/']
      }
    });
  });

  test('should modify children into flat structure with few routes', () => {
    expect(
      refreshChildren({
        children: {
          root: { parentId: 0, id: 1, name: 'root', path: '', state: ['/'] },
          about: {
            parentId: 0,
            id: 2,
            name: 'about',
            path: 'about',
            state: ['/', 'about']
          },
          car: {
            parentId: 0,
            id: 3,
            name: 'car',
            path: 'car',
            state: ['/', 'car']
          }
        },
        parentId: null,
        id: 0,
        name: 'root',
        path: '',
        state: ['/']
      })
    ).toEqual({
      root: {
        parentId: null,
        id: 1,
        name: 'root',
        path: '',
        state: ['/']
      },
      about: {
        parentId: 1,
        id: 2,
        name: 'about',
        path: 'about',
        state: ['/', 'about']
      },
      car: {
        parentId: 1,
        id: 3,
        name: 'car',
        path: 'car',
        state: ['/', 'car']
      }
    });
  });

  test('should modify children into flat structure with few routes and parent with inheritor have different names', () => {
    expect(
      refreshChildren({
        children: {
          about: {
            parentId: 0,
            id: 1,
            name: 'about',
            path: 'about',
            state: ['/', 'about']
          },
          root: { parentId: 0, id: 2, name: 'root', path: '', state: ['/'] },
          car: {
            parentId: 0,
            id: 3,
            name: 'car',
            path: 'car',
            state: ['/', 'car']
          }
        },
        parentId: null,
        id: 0,
        name: 'root',
        path: '',
        state: ['/']
      })
    ).toEqual({
      about: {
        parentId: null,
        id: 1,
        name: 'about',
        path: 'about',
        state: ['/', 'about']
      },
      root: {
        parentId: 1,
        id: 2,
        name: 'root',
        path: '',
        state: ['/']
      },
      car: {
        parentId: 1,
        id: 3,
        name: 'car',
        path: 'car',
        state: ['/', 'car']
      }
    });
  });
});
