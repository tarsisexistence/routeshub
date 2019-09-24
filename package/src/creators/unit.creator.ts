import { indexer } from '../utils/indexer';
import { InternalSpot, InternalUnit, Notes, Spot } from '../interfaces';
import { getState } from '../utils/state';

/**
 * serializes routes to enhance capabilities
 */
export const createUnit = <R, C>(
  parentSpot: Spot | null,
  notes: Notes<R, C>
): InternalUnit<R, C> =>
  Object.keys(notes).reduce(
    (acc: InternalUnit<R, C>, key: string): InternalUnit<R, C> => {
      const { children, path, name } = notes[key];
      const route: InternalSpot = {
        parentId: parentSpot && parentSpot.id,
        state: getState(parentSpot, path),
        id: indexer.next().value,
        path,
        name
      };

      if (children !== undefined) {
        route.children = createUnit(route, children);
      }

      return Object.assign(acc, { [name]: route });
    },
    {} as InternalUnit<R, C>
  );
