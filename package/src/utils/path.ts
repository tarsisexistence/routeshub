/**
 * Prevents to record empty state paths
 */
export const setNotEmptyPath = (state: string[], path: string): string[] =>
  path === '' ? state : [...state, path];

/**
 * Checks multi path in a single route
 */
export const checkMultiPath = (path: string): boolean => path.includes('/');

export const setOnlyPaths = (link: string[]): string[] =>
  link.filter((path: string) => path.length > 0 && path !== '/');

/**
 * Prevents to record multi path in the state
 */
export const splitPath = (path: string): string[] => {
  const notReadyLink = path.split('/');
  return ['/', ...setOnlyPaths(notReadyLink)];
};
