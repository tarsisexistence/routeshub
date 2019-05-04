import { Structure } from '../interfaces';
import { splitPath } from './path';

// makes adjustments to string link
export function correctStringLink(value: string): string {
  switch (true) {
    case value === '[Object object]': {
      console.error(`ERROR: ${value} has been passed into navLink`);
      return '/';
    }
    case value[1] === ',':
      return value.replace(',', '');
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
    return splitPath(link);
  } else if (input instanceof Array) {
    return input;
  } else if (typeof input === 'object' && input.state) {
    return input.state;
  }

  return [];
};

// converts array-like link into string literal
export const getRouteHref = (link: string[]): string => link.join('/').slice(1);