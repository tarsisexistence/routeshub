import { Route } from '@angular/router';
import { hub } from '../hub';
import { Note, RouteNameOptions } from '../interfaces';
import { setRouteName } from '../utils/name';

export const createUnion = <T>(slices: T): T =>
  Object.keys(slices).reduce(
    (acc: T, name: string) => {
      const hasValue = Boolean(hub.value[name]);

      if (!hasValue) {
        console.error(`ERROR: property ${name} is doesn't exist in the hub.
      Please check existing keys in HUB to avoid mistakes in the future.`);
      }

      return hasValue
        ? { ...acc, [name]: hub.value[name] }
        : { ...acc, [name]: slices[name] };
    },
    {} as T
  );

/**
 * creates a route note
 */
export const createNote = <R = {}, C = {}>(
  routes: Route[],
  nameOptions: RouteNameOptions = {}
): R & C =>
  routes.reduce(
    (acc: R & C, route: Route): R & C => {
      const note: Note = {
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
    },
    {} as R & C
  );
