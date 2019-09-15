import { InternalSpot, Unit } from '../interfaces';

/**
 * refreshes children parent target
 * because of replacing them with a parent node
 */
export function refreshChildren<R, C>(parent: InternalSpot<C>): Unit<C> {
  const children: Unit<C> = parent.children;
  const inheritorId: number = parent.id + 1;
  const inheritorName: string = Object.keys(children).find(
    (name: string) => children[name].id === inheritorId
  );

  return Object.keys(children).reduce(
    (unit: Unit<C>, name: string): Unit<C> => {
      const parentId =
        children[name].id === inheritorId
          ? parent.parentId
          : children[inheritorName].id;
      const routeName =
        name === inheritorName && name === 'root' ? parent.name : name;
      const route = { ...children[name], parentId, name: routeName };

      /* https://github.com/Microsoft/TypeScript/issues/10727 */
      return { ...(unit as object), [routeName]: route } as Unit<C>;
    },
    {} as Unit<C>
  );
}
