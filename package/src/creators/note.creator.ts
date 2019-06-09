import { Route } from '@angular/router';
import { Note, RouteNameOptions } from '../interfaces';
import { setRouteName } from '../utils/name';

/**
 * creates a route note
 */
export const createNote = <R = {}>(
  routes: Route[],
  nameOptions: RouteNameOptions = {}
): R =>
  routes.reduce(
    (acc: R, route: Route): R => {
      const note: Note = {
        path: route.path,
        name: route['name'] || setRouteName(route.path, nameOptions)
      };

      if (route.children) {
        note.children = createNote(route.children, nameOptions);
      }

      return { ...acc, [note.name]: note };
    },
    {} as R
  );
