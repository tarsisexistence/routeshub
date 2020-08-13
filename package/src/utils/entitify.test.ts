import { entitify } from './entitify';

describe('[utils] entitify', () => {
  test('should return the same when no children and one spot', () => {
    expect(
      entitify({
        root: {
          parentId: null,
          id: 0,
          name: 'root',
          path: '',
          state: ['/']
        }
      })
    ).toEqual({
      root: {
        parentId: null,
        id: 0,
        name: 'root',
        path: '',
        state: ['/']
      }
    });
  });

  test('should return the same when no children and few spots', () => {
    expect(
      entitify({
        root: {
          parentId: null,
          id: 0,
          name: 'root',
          path: '',
          state: ['/']
        },
        location: {
          parentId: null,
          id: 1,
          name: 'location',
          path: 'location',
          state: ['/', 'location']
        }
      })
    ).toEqual({
      root: {
        parentId: null,
        id: 0,
        name: 'root',
        path: '',
        state: ['/']
      },
      location: {
        parentId: null,
        id: 1,
        name: 'location',
        path: 'location',
        state: ['/', 'location']
      }
    });
  });

  test('should return unit with only child with identical data', () => {
    expect(
      entitify({
        root: {
          children: {
            root: { parentId: 0, id: 1, name: 'root', path: '', state: ['/'] }
          },
          parentId: null,
          id: 0,
          name: 'root',
          path: '',
          state: ['/']
        }
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

  test('should return unit with only child of different name', () => {
    expect(
      entitify({
        root: {
          children: {
            about: {
              parentId: 0,
              id: 1,
              name: 'about',
              path: 'about',
              state: ['/', 'about']
            }
          },
          parentId: null,
          id: 0,
          name: 'root',
          path: '',
          state: ['/']
        }
      })
    ).toEqual({
      about: {
        parentId: null,
        id: 1,
        name: 'about',
        path: 'about',
        state: ['/', 'about']
      }
    });
  });

  test('should make entity unit from one spot with two child', () => {
    expect(
      entitify({
        root: {
          children: {
            root: {
              parentId: 0,
              id: 1,
              name: 'root',
              path: '',
              state: ['/']
            },
            about: {
              parentId: 0,
              id: 2,
              name: 'about',
              path: 'about',
              state: ['/', 'about']
            }
          },
          parentId: null,
          id: 0,
          name: 'root',
          path: '',
          state: ['/']
        }
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
      }
    });
  });

  test('should make entity unit from multiple children', () => {
    expect(
      entitify({
        root: {
          children: {
            root: {
              parentId: 0,
              id: 1,
              name: 'root',
              path: '',
              state: ['/']
            },
            about: {
              parentId: 0,
              id: 2,
              name: 'about',
              path: 'about',
              state: ['/', 'about']
            }
          },
          parentId: null,
          id: 0,
          name: 'root',
          path: '',
          state: ['/']
        },
        location: {
          children: {
            root: {
              parentId: 3,
              id: 4,
              name: 'root',
              path: 'location',
              state: ['/', 'location']
            },
            map: {
              parentId: 3,
              id: 5,
              name: 'map',
              path: 'location/map',
              state: ['/', 'location', 'map']
            }
          },
          parentId: null,
          id: 3,
          name: 'location',
          path: 'location',
          state: ['/', 'location']
        }
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
      location: {
        parentId: null,
        id: 4,
        name: 'location',
        path: 'location',
        state: ['/', 'location']
      },
      map: {
        parentId: 4,
        id: 5,
        name: 'map',
        path: 'location/map',
        state: ['/', 'location', 'map']
      }
    });
  });
});
