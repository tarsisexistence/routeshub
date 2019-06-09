/**
 * Prevents to record empty state paths
 */
export const setNotEmptyPath = (state: string[], path: string): string[] =>
  path === '' ? state : [...state, path];

export const setOnlyPaths = (link: string[]): string[] =>
  link.filter((path: string) => path.length > 0 && path !== '/');

/**
 * Prevents to record multi path in the state
 */
export const transformPathToState = (path: string): string[] => {
  const rawPaths = path.split('/');
  const paths = setOnlyPaths(rawPaths);
  return ['/', ...paths];
};
