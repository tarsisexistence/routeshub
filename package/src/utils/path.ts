import { DefaultNameOptions } from '../interfaces';

/**
 * removes empty or slash paths
 */
export const setOnlyPaths = (link: string[]): string[] =>
  link.filter((path: string) => path.length > 0 && path !== '/');

/**
 * Prevents to record multi path in the state
 */
export const transformPathToState = (
  path: string,
  state: string[] = ['/']
): string[] => {
  const rawPaths = path.split('/');
  const paths = setOnlyPaths(rawPaths);
  return state.concat(paths);
};

/**
 * checks a string on wildcard path
 */
export const isWildcard = (path: string) => path === '**';

/**
 * cuts off unwanted strings
 */
function fixPathName(path: string): string {
  let newPath = '';
  let index = path.length - 1;

  if (path[index] === '/') {
    index -= 1;
  }

  while (index > -1) {
    const char = path[index];
    const nextChar = path[index - 1];
    if (nextChar === '/' || nextChar === ':') {
      newPath = char + newPath;
      break;
    } else if (nextChar === '-' || nextChar === '_') {
      newPath = char.toUpperCase() + newPath;
      index -= 1;
    } else {
      newPath = char + newPath;
    }

    index -= 1;
  }

  return newPath;
}

/**
 * sets a route name
 * based on path and options
 */
export function setRouteName(
  path: string,
  nameOptions: DefaultNameOptions = {}
): string {
  if (path === '') {
    return nameOptions.root || 'root';
  } else if (isWildcard(path)) {
    return nameOptions.wildcard || 'wildcard';
  } else {
    return fixPathName(path);
  }
}
