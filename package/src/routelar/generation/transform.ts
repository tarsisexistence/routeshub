import { flatRoutes } from './flatRoutes';
import { transformPathToState } from '../../utils/path';

// TODO: 'string' signature possibly not safe
const normalizePath = (path: string): string =>
  path[0] === ':' ? 'string' : path;

const isLeaf = (node: string[] | Record<any, any>): boolean =>
  Array.isArray(node);

export function transform(
  routes: Routelar.TransformRoutes,
  vRoutes: Routelar.VirtualRoutes = {},
  currentTuple = ['/']
): Routelar.VirtualRoutes {
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
            vRoutesNested[separatePath] = vRoutesNested[separatePath] ?? {};

            const transformedNestedRoutes = transform(
              flattenRoutes[path],
              vRoutesNested[separatePath] as Routelar.VirtualRoutes,
              nextTuple
            );
            if (isLeaf(vRoutesNested[separatePath])) {
              (vRoutesNested[
                separatePath
              ] as Routelar.VirtualRoutes).root = vRoutesNested[
                separatePath
              ] as Routelar.VirtualRoutesLeaf;
            }

            for (const route in transformedNestedRoutes) {
              vRoutesNested[separatePath][route] =
                transformedNestedRoutes[route];
            }
          }
        } else if (isLeaf(vRoutesNested[separatePath])) {
          vRoutesNested[separatePath] = {
            root: vRoutesNested[separatePath]
          } as Routelar.VirtualRoutes;
          vRoutesNested = vRoutesNested[separatePath] as Routelar.VirtualRoutes;
        } else {
          vRoutesNested[separatePath] = vRoutesNested[separatePath] ?? {};
          vRoutesNested = vRoutesNested[separatePath] as Routelar.VirtualRoutes;
        }
      }
    } else if (isEndRoute) {
      vRoutes[path] =
        path in vRoutes ? { ...vRoutes[path], root: nextTuple } : nextTuple;
    } else {
      const transformedNestedRoutes = transform(
        flattenRoutes[path],
        vRoutes[path] as Routelar.VirtualRoutes,
        nextTuple
      );
      vRoutes[path] = isLeaf(vRoutes[path])
        ? ({
            root: vRoutes[path],
            ...transformedNestedRoutes
          } as Routelar.VirtualRoutes)
        : transformedNestedRoutes;
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
