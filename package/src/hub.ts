import { entitify } from './utils';

import { Entities, Entity, Route, Routes, Structure } from './interfaces';

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

  public createRoot<T>(routes: Routes<T>): Entity<T> {
    if (this._entity) {
      throw new Error('Routeshub is already declared');
    }

    const rootEntity = entitify<T>(null, routes);

    this.initEntity();
    this.updateEntity('app', rootEntity);

    return rootEntity as Entity<T>;
  }

  public createFeature<T>(
    parentRoute: Structure,
    routes: Routes<T>
  ): Entity<T> {
    const featureEntity = entitify<T>(parentRoute, routes);
    this.updateEntity<Entity<T>>(parentRoute.route, featureEntity);

    return featureEntity;
  }

  public getEntity(): Entities<C> {
    return this.entity;
  }

  private initEntity(): void {
    this._entity = {} as Entities<C>;
  }

  private updateEntity<T>(route: string, entity: T): void {
    // tslint:disable-next-line
    this._entity = Object.assign({}, this._entity, { [route]: entity });
  }
}
