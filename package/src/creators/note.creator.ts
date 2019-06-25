import { Route } from '@angular/router';
import { DefaultRouteName, Note } from '../interfaces';
import { setRouteName } from '../utils/name';

/**
 * creates a route note
 */
export const createNote = <R = {}>(
  routes: Route[],
  nameOptions: DefaultRouteName = {}
): R =>
  routes.reduce(
    (acc: R, route: Route): R => {
      const note: Note = {
        path: route.path,
        name: setRouteName(route.path, nameOptions)
      };

      if (route.children) {
        note.children = createNote(route.children, nameOptions);
      }

      return { ...acc, [note.name]: note };
    },
    {} as R
  );
