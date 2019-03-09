import { InternalStructure, Slice } from '../interfaces';

/**
 * refreshes children parent target
 * because of replacing them with a parent node
 */
export function refreshChildren<R, C>(parent: InternalStructure<C>): Slice<C> {
  const children: Slice<C> = parent.children;
  const inheritorId: number = parent.id + 1;
  const inheritorName: string = Object.keys(children).find(
    (routeName: string) => children[routeName].id === inheritorId
  );

  return Object.keys(children).reduce(
    (acc: Slice<C>, name: string): Slice<C> => {
      const parentId =
        children[name].id === inheritorId
          ? parent.parentId
          : children[inheritorName].id;
      const routeName =
        name === inheritorName && name === 'root' ? parent.routeName : name;
      const route = { ...children[name], parentId, routeName };

      /* tslint:disable:prefer-object-spread */
      /* https://github.com/Microsoft/TypeScript/issues/10727 */
      return { ...(acc as object), [routeName]: route } as Slice<C>;
    },
    {} as Slice<C>
  );
}
