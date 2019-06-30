import { Route } from '@angular/router';
import { DefaultRouteNames, Note, Notes } from '../interfaces';
import { setRouteName } from '../utils/name';

/**
 * creates a route note
 */
export const createNote = <R = any>(
  routes: Route[],
  nameOptions: DefaultRouteNames = {}
): Notes<R> =>
  routes.reduce(
    (acc: Notes<R>, route: Route): Notes<R> => {
      const note: Note = {
        path: route.path,
        name: setRouteName(route.path, nameOptions)
      };

      if (route.children) {
        note.children = createNote(route.children, nameOptions);
      }

      return { ...acc, [note.name]: note };
    },
    {} as Notes<R>
  );
