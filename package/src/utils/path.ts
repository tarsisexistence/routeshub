/**
 * Prevents to record empty state paths
 */
export const setNotEmptyPath = (state: string[], path: string): string[] =>
  path === '' ? state : [...state, path];

/**
 * Checks multi path in a single route
 */
export const checkMultiPath = (path: string): boolean => path.includes('/');

/**
 * Prevents to record multi path in the state
 */
export const splitPath = (path: string): string[] =>
  path
    .split('/')
    .reduce(
      (link: string[], pathUnit: string): string[] =>
        setNotEmptyPath(link, pathUnit),
      ['/']
    );
