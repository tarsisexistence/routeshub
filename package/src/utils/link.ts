import { Structure } from '../interfaces';
import { transformPathToState } from './path';

/**
 * makes adjustments to string link
 */
export function correctStringLink(value: string): string {
  switch (true) {
    case value === '[Object object]': {
      // tslint:disable-next-line:max-line-length
      console.error(
        `ERROR: incorrect [[${value}]] has been passed into navLink`
      );
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
export const getRouteLink = (
  input: string | string[] | Structure
): string[] => {
  if (typeof input === 'string') {
    const link = correctStringLink(input);
    return transformPathToState(link);
  } else if (input instanceof Array) {
    return input;
  } else if (typeof input === 'object' && input.state) {
    return input.state;
  } else {
    console.error('ERROR: navLink gets incorrect data format', '\n', input);
    return [];
  }
};

/**
 * converts an array-like link into href
 */
export const getRouteHref = (link: string[]): string => {
  const paths = link.filter(
    (value: string) => value.length > 0 && value !== '/'
  );
  return `/${paths.join('/')}`;
};
