/**
 * Prevents to record empty state paths
 */
export function setNotEmptyPath(state: string[], path: string): string[] {
  return path !== '' ? [...state, path] : state;
}

/**
 * Checks multi path in a single route
 */
export function checkMultiPath(path: string): boolean {
  const slashId = path ? path.indexOf('/') : -1;

  return slashId !== -1;
}

/**
 * Prevents to record multi path in the state
 */
export function splitPath(path: string): string[] {
  return path.split('/').filter((state: string) => !!state);
}
