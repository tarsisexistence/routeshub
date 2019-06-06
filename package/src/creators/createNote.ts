import { Route, Routes } from '@angular/router';
import { RouteNote } from '../../index';

/**
 * creates a route note
 */
export const createNote =
  <R = {}, C = {}>(routes: Routes, nameOptions: NameOptions = {}): R & C =>
    routes.reduce((acc: R & C, route: Route): R & C => {
      const note: RouteNote = {
        path: route.path,
        name: route['name'] || setRouteName(route.path, nameOptions)
      };

      if (route.loadChildren) {
        note.lazy = route.loadChildren;
      }

      if (route.children) {
        note.children = createNote(route.children, nameOptions);
      }

      return { ...acc, [note.name]: note };
    }, {} as R & C);

/**
 * sets a route name
 * based on path and options
 */

function setRouteName(path: string, nameOptions: NameOptions = {}): string {
  if (path === '') {
    return nameOptions.root || 'root';
  } else if (path === '**') {
    return nameOptions.wildcard || 'wildcard';
  } else {
    const newPath = path.slice(path.lastIndexOf('/') + 1);
    return newPath[0] === ':' ? newPath.slice(1) : newPath;
  }
}

/**
 * describes Route Name options
 */
interface NameOptions {
  root?: string;
  wildcard?: string
}
