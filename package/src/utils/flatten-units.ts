import { InternalUnit, Unit } from '../interfaces/unit.interfaces';
import { InternalSpot } from '../interfaces';

/**
 * refreshes children parent target
 * since we do not want to have ''/'' path
 * so, it retrieves children and replaces instead of parent one of the children
 * sibling unit (next by id) becomes "parent" parent-sibling unit
 */
export function flatChildrenUnit<R, C>(
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

/**
 * Detects and handles children routes
 */
export const flatUnit = <R, C>(routes: InternalUnit<R, C>): Unit<R, C> =>
  Object.keys(routes).reduce((acc: Unit<R, C>, key: string): Unit<R, C> => {
    const route = routes[key];

    if (!route.children) {
      return Object.assign({}, acc, { [key]: route });
    }

    const refreshedChildren = flatChildrenUnit<R, C>(route);
    return Object.assign({}, acc, refreshedChildren);
  }, {} as Unit<R, C>);
