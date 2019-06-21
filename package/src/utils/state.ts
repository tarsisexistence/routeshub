import { Params } from '../interfaces';
import { setNotEmptyPath, transformPathToState } from './path';

/**
 * Assigns a value based on the parent's  state and a current path
 */
export const setState = (parentSlice, path) => {
  if (path[0] === '*') {
    return [path];
  }

  return parentSlice === null
    ? transformPathToState(path)
    : setNotEmptyPath(parentSlice.state, path);
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

/**
 * Supports dynamic paths for href
 * through route variables
 */
export function forwardHrefParams(href: string, params?: Params): string {
  if (!params || typeof params !== 'object') {
    return href;
  }

  return insertHrefParams(href, params);
}
