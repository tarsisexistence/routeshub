import { InternalSpot, InternalUnit, Unit } from '../interfaces';

/**
 * refreshes children parent target
 * since we do not want to have ''/'' path
 * so, it retrieves children and replaces instead of parent
 * and one of the children sibling unit (next by id) becomes "parent" parent-sibling unit
 */
export function refreshChildren<R, C>(
  parentSpot: InternalSpot<C> & { children: InternalUnit<C> }
): Unit<C> {
  const children: Unit<C> = parentSpot.children;
  const childrenKeys = Object.keys(children);
  const inheritorId: number = parentSpot.id + 1;
  const inheritorName: string = childrenKeys.find(
    (name: string) => children[name].id === inheritorId
  );

  return childrenKeys.reduce((unit: Unit<C>, name: string): Unit<C> => {
    const parentId =
      children[name].id === inheritorId
        ? parentSpot.parentId
        : children[inheritorName].id;
    const routeName =
      name === inheritorName && name === 'root' ? parentSpot.name : name;
    const route = { ...children[name], parentId, name: routeName };

    return { ...unit, [routeName]: route } as Unit<C>;
  }, {} as Unit<C>);
}
