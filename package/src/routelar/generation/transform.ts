import { flatRoutes } from './flatRoutes';
import { transformPathToState } from '../../utils/path';

const normalizePath = (path: string) => (path[0] === ':' ? 'string' : path);

export function transform(
  routes: any,
  vRoutes: any = {},
  currentTuple = ['/']
) {
  const flattenRoutes = flatRoutes(routes);

  Object.keys(flattenRoutes).forEach(path => {
    const isEndRoute = Object.keys(flattenRoutes[path]).length === 0;
    const isMultipath = path.includes('/');
    const nextTuple =
      path === 'root' || isMultipath
        ? currentTuple.slice()
        : currentTuple.concat(normalizePath(path));

    if (isMultipath) {
      const multiPathState = transformPathToState(path, []);
      let vRoutesNested = vRoutes;

      for (let i = 0; i < multiPathState.length; i += 1) {
        const separatePath = multiPathState[i];
        nextTuple.push(normalizePath(separatePath));

        if (i === multiPathState.length - 1) {
          if (isEndRoute) {
            vRoutesNested[separatePath] =
              separatePath in vRoutesNested
                ? {
                    ...vRoutesNested[separatePath],
                    root: nextTuple
                  }
                : nextTuple;
          } else {
            const value = transform(
              flattenRoutes[path],
              vRoutesNested[separatePath],
              nextTuple
            );
            if (Array.isArray(vRoutesNested[separatePath])) {
              vRoutesNested.root = vRoutesNested[separatePath];
            }

            for (const prop in value) {
              vRoutesNested[prop] = value[prop];
            }
          }
        } else if (Array.isArray(vRoutesNested[separatePath])) {
          vRoutesNested[separatePath] = {
            root: vRoutesNested[separatePath]
          };
          vRoutesNested = vRoutesNested[separatePath];
        } else {
          vRoutesNested[separatePath] = vRoutesNested[separatePath] ?? {};
          vRoutesNested = vRoutesNested[separatePath];
        }
      }
    } else if (isEndRoute) {
      vRoutes[path] =
        path in vRoutes ? { ...vRoutes[path], root: nextTuple } : nextTuple;
    } else {
      const value = transform(flattenRoutes[path], vRoutes[path], nextTuple);
      vRoutes[path] = Array.isArray(vRoutes[path])
        ? { root: vRoutes[path], ...value }
        : value;
    }
  });

  return vRoutes;
}

/**desired v1
 interface Routes {
  root: ['/'];
  home: ['/', 'home'];
  about: ['/', 'about'];
  car: ['/', 'car'];
  details: ['/', 'details'];
  info: ['/', 'info'];

  users: { root: ['/', 'users'] } & {
    [$id: string]: {
      profile: ['/', string, 'profile'];
    };
  };

  engine: {
    [$year: string]: ['/', 'engine', string]
  };
}
 */

/**desired v2
 interface Routes {
  root: ['/'];
  home: ['/', 'home'];
  about: ['/', 'about'];
  car: ['/', 'car'];
  details: ['/', 'details'];
  info: ['/', 'info'];

  users: { root: ['/', 'users'] } & {
    [$id: string]: {
      root: ['/', string];
      profile: ['/', string, 'profile'];
    };
  };

  engine: { root: ['/', 'engine'] } & {
    [$year: string]: ['/', 'engine', string]
  };
}
 */

/** tuples
 type routes =
 | ['home']
 | ['users', string, 'profile']
 | ['location']
 | ['location', 'map'];

 const route: routes = ['users', 'asd'];
 */
