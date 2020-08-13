import { Params, Spot } from '../interfaces';
import { transformPathToState } from './path';
import { showError } from './helpers';

/**
 * makes adjustments to string link
 */
export function correctStringLink(value: string): string {
  switch (true) {
    case value === '[Object object]': {
      showError(`ERROR: incorrect [[${value}]] has been passed into navLink.`);
      return '/';
    }
    case value.includes(','):
      while (value.includes(',')) {
        value = value.replace(',', '/');
      }
      return value;
    default:
      return value;
  }
}

/*
 * get route link from
 * string literal, route node, or route link
 */
export const getRouteLink = (input: string | string[] | Spot): string[] => {
  if (typeof input === 'string') {
    const link = correctStringLink(input);
    return transformPathToState(link);
  } else if (input instanceof Array) {
    return input;
  } else if (typeof input === 'object' && input.state) {
    return input.state;
  } else {
    showError('ERROR: navLink gets incorrect data format', '\n', input);
    return [];
  }
};

/**
 * converts an array-like link into href
 */
const parseRouteHref = (link: string[]): string => {
  const paths = link.filter(
    (value: string) => value.length > 0 && value !== '/'
  );
  return `/${paths.join('/')}`;
};

const handleParamsPath = (path: string, params: Params): string => {
  const param = path.slice(1);
  return path[0] === ':' && Boolean(params[param]) ? params[param] : path;
};

/**
 * Replaces original dynamic path with params
 * Generates dynamic-ready links
 */
export const insertLinkParams = (paths: string[], params: Params): string[] =>
  paths.map((path: string): string => handleParamsPath(path, params));

/**
 * Replaces original href with params
 * Generates dynamic-ready href
 */
const insertHrefParams = (href: string, params: Params): string =>
  href.split('/').reduce((acc: string, path: string): string => {
    if (path.length === 0 || path === '/') {
      return acc;
    }

    const paramsVerifiedPath = handleParamsPath(path, params);
    return `${acc}/${paramsVerifiedPath}`;
  }, '');

/**
 * defines href of the link
 * based on link data and parameters
 */
export const getRouteHref = (
  link: string[],
  params: Record<string, string>
): string => {
  const originalHref = parseRouteHref(link);
  return insertHrefParams(originalHref, params);
};
