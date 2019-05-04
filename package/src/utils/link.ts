import { Structure } from '../interfaces';
import { splitPath } from './path';

export const getLinkFromStructure = (input: Structure | any) => {
  return input.state;
};

const correctStringLink = (value: string): string => {
  if (value === '[Object object]') {
    // checks invalid forwarded data
    console.error(`ERROR: ${value} has been passed into navLink`);
    return '/';
  } else if (value[1] === ',') {
    // checks auto toString and rewrites it
    return value.replace(',', '');
  }

  return value;
};

export const getRouteLink = (
  input: string | string[] | Structure
): string[] => {
  if (typeof input === 'string') {
    const link = correctStringLink(input);
    return splitPath(link);
  } else if (input instanceof Array) {
    return input;
  } else if (typeof input === 'object' && input.state) {
    return getLinkFromStructure(input);
  }

  return [];
};
