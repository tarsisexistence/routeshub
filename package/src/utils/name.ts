import { DefaultRouteName } from '../interfaces/common.interfaces';

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
  } else if (path === '**') {
    return nameOptions.wildcard || 'wildcard';
  } else {
    return fixPathName(path);
  }
}

export function assignCreatorArgs<R>(
  args: (symbol | DefaultRouteName)[],
  name: string
): { key: symbol | string; options: DefaultRouteName } {
  const res = {} as { key: symbol | string; options: DefaultRouteName };

  args.forEach(arg => {
    if (typeof arg === 'symbol') {
      res.key = arg;
    } else if (typeof arg === 'object') {
      res.options = arg;
    }
  });

  return {
    key: res.key || name,
    options: res.options || {}
  };
}
