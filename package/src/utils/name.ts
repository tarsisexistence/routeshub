import { DefaultRouteName, Slice, Structure } from '../interfaces';
import { isWildcard } from './path';

function fixPathName(path: string): string {
  let newPath = '';
  let i = path.length - 1;

  if (path[i] === '/') {
    i -= 1;
  }

  while (i > -1) {
    const char = path[i];
    const nextChar = path[i - 1];
    if (nextChar === '/' || nextChar === ':') {
      newPath = char + newPath;
      break;
    } else if (nextChar === '-' || nextChar === '_') {
      newPath = char.toUpperCase() + newPath;
      i -= 1;
    } else {
      newPath = char + newPath;
    }

    i -= 1;
  }

  return newPath;
}

/**
 * sets a route name
 * based on path and options
 */
export function setRouteName(
  path: string,
  nameOptions: DefaultRouteName = {}
): string {
  if (path === '') {
    return nameOptions.root || 'root';
  } else if (isWildcard(path)) {
    return nameOptions.wildcard || 'wildcard';
  } else {
    return fixPathName(path);
  }
}

/**
 * possible args
 * in root/feature creators
 */
interface CreatorArgs {
  key: symbol | string;
  options: DefaultRouteName;
  siblings: ((parent: Structure) => Slice<any>)[];
}

/**
 * assigns create fn options properly
 */
export function assignCreatorArgs<R>(
  args: (symbol | DefaultRouteName | ((parent: Structure) => Slice<any>)[])[],
  name: string
): CreatorArgs {
  const res = {} as CreatorArgs;

  args.forEach(arg => {
    if (typeof arg === 'symbol') {
      res.key = arg;
    } else if (Array.isArray(arg)) {
      res.siblings = arg;
    } else {
      res.options = arg;
    }
  });

  return {
    key: res.key || name,
    options: res.options || {},
    siblings: res.siblings || []
  };
}
