import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';

import { Observable, of } from 'rxjs';

import { vehicles } from '../../../assets/data/vehicles';
import { Vehicle } from '../../core/interfaces/vehicle';

@Injectable()
export class VehiclesResolver implements Resolve<string[] | Vehicle[]> {
  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<string[] | Vehicle[]> {
    const isTypes = route.routeConfig.resolve.vehicles === undefined;
    const vehicle = state.url.slice(1);
    const isVehicle = Object.keys(vehicles).includes(vehicle);

    if (!isVehicle) {
      return;
    }

    const types = vehicles[vehicle].reduce(
      (acc, item) => [...acc, item.brand],
      []
    );

    return isTypes ? of(types) : of(vehicles[vehicle]);
  }
}
