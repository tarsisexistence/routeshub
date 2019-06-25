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
