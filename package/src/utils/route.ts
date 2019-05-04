import { Structure } from '../interfaces';
import { splitPath } from './path';

export const getLinkFromStructure = (input: Structure | any) => {
  return input.state;
};

export const getRouteLink = (
  input: string | string[] | Structure
): string[] => {
  if (typeof input === 'string') {
    return splitPath(input);
  } else if (input instanceof Array) {
    return input;
  } else if (typeof input === 'object' && input.state) {
    return getLinkFromStructure(input);
  }

  return [];
};
