import { entitify } from './utils';

import { Entities, Entity, Routes, Structure } from './interfaces';

export class Hub<C> {
  public get entity(): Entities<C> {
    return this._entity;
  }

  private _entity: Entities<C>;

  public static inject<C>(): Hub<C> {
    if (!Hub.inject['instance']) {
      Hub.inject['instance'] = new Hub<C>();
    }

    return Hub.inject['instance'];
  }

  public createRoot<T, Cr = {}>(
    routes: Routes<T>,
    route: string
  ): Entity<T & Cr> {
    if (this._entity) {
      throw new Error('Routeshub is already declared');
    }

    const rootEntity = entitify<T>(null, routes);

    this.initEntity();
    this.updateEntity(route, rootEntity);

    return this._entity[route] as Entity<T & Cr>;
  }

  public createFeature<T>(
    parentRoute: Structure,
    routes: Routes<T>
  ): Entity<T> {
    const featureEntity = entitify<T>(parentRoute, routes);
    this.updateEntity<Entity<T>>(parentRoute.route, featureEntity);

    return featureEntity;
  }

  public getRecords(): Entities<C> {
    return this.entity;
  }

  public getEntity<E>(route: string): Entity<E> {
    return this.entity[route];
  }

  private initEntity(): void {
    this._entity = {} as Entities<C>;
  }

  private updateEntity<T>(branch: string, routes: T): void {
    const children = Object.keys(routes).reduce((acc, routeName) => {
      if (!routes[routeName].children) {
        return acc;
      }

      return { ...acc, ...routes[routeName].children };
    }, {});
    const hasChildren = Object.keys(children).length > 0;
    // tslint:disable-next-line
    this._entity = Object.assign({}, this._entity, {
      [branch]: hasChildren ? children : routes
    });
  }
}
