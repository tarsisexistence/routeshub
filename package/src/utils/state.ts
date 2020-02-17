import { Spot } from '../interfaces';
import { isWildcard, transformPathToState } from './path';

/**
 * Assigns a value based on the parent's  state and a current path
 */
export const getState = (parentSpot: Spot, path: string): string[] => {
  if (isWildcard(path)) {
    return [path];
  }

  return parentSpot === null
    ? transformPathToState(path)
    : transformPathToState(path, parentSpot.state);
};
