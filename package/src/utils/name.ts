import { RouteNameOptions } from 'lib/src/interfaces/common.interfaces';

/**
 * sets a route name
 * based on path and options
 */

export function setRouteName(
  path: string,
  nameOptions: RouteNameOptions = {}
): string {
  if (path === '') {
    return nameOptions.root || 'root';
  } else if (path === '**') {
    return nameOptions.wildcard || 'wildcard';
  } else {
    const newPath = path.slice(path.lastIndexOf('/') + 1);
    return newPath[0] === ':' ? newPath.slice(1) : newPath;
  }
}
