import { Route } from '@angular/router';
import { DefaultNameOptions, Note, Notes } from '../interfaces';
import { setRouteName } from '../utils/name';

/**
 * creates a route note
 */
export const createNote = <R = any, C = any>(
  routes: Route[],
  nameOptions: DefaultNameOptions = {}
): Notes<R, C> =>
  routes.reduce(
    (acc: Notes<R, C>, route: Route): Notes<R, C> => {
      const note: Note = {
        path: route.path,
        name: setRouteName(route.path, nameOptions)
      };

      if (route.children) {
        note.children = createNote(route.children, nameOptions);
      }

      return { ...acc, [note.name]: note };
    },
    {} as Notes<R, C>
  );
