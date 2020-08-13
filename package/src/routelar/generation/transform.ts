/** tuples
 type routes =
  | ['home']
  | ['users', string, 'profile']
  | ['location']
  | ['location', 'map'];

 const route: routes = ['users', 'asd'];
 */
import { flatRoutes } from './generation.utils';

// TODO: don't forget to parse this case engine/:year for engine and nested :year
export function transform(
  routes: any,
  vRoutes: any = {},
  currentTuple = ['/']
) {
  const flattenRoutes = flatRoutes(routes);

  Object.keys(flattenRoutes).forEach(path => {
    const normalizedPath = path[0] === ':' ? 'string' : path;
    const nextTuple =
      path === 'root'
        ? currentTuple.slice()
        : currentTuple.concat(normalizedPath);

    if (Object.keys(flattenRoutes[path]).length === 0) {
      vRoutes[path] = nextTuple;
    } else {
      vRoutes[path] = transform(flattenRoutes[path], vRoutes[path], nextTuple);
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
