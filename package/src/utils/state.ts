import { Params } from '../interfaces';
import { isWildcard, transformPathToState } from './path';

/**
 * Assigns a value based on the parent's  state and a current path
 */
export const setState = (parentSlice, path) => {
  if (isWildcard(path)) {
    return [path];
  }

  return parentSlice === null
    ? transformPathToState(path)
    : transformPathToState(path, parentSlice.state);
};

const handleParamsPath = (path: string, params: Params): string => {
  const param = path.slice(1);
  return path[0] === ':' && Boolean(params[param]) ? params[param] : path;
};

/**
 * Replaces original dynamic path with params
 * Generates dynamic-ready links
 */
// TODO: think about semantics
export const insertLinkParams = (paths: string[], params: Params): string[] =>
  paths.map((path: string): string => handleParamsPath(path, params));

/**
 * Replaces original href with params
 * Generates dynamic-ready href
 */
export const insertHrefParams = (href: string, params: Params): string =>
  href.split('/').reduce((acc: string, path: string): string => {
    if (path.length === 0 || path === '/') {
      return acc;
    }

    const paramsVerifiedPath = handleParamsPath(path, params);
    return `${acc}/${paramsVerifiedPath}`;
  }, '');
