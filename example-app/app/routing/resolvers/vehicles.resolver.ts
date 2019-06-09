import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';

import { asapScheduler, Observable, scheduled } from 'rxjs';

import { Vehicle } from '../../core/interfaces/vehicle.interface';
import { vehicles } from '../../../assets/data/vehicles';

/**
 * Declares resolver that solves business logic problems
 */
@Injectable()
export class VehiclesResolver
  implements Resolve<{ brand: string; logo: string }[] | Vehicle[]> {
  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{ brand: string; logo: string }[] | Vehicle[]> {
    const vehicle = state.url.slice(1);
    const isVehicle = Object.keys(vehicles).includes(vehicle);

    if (!isVehicle) {
      return;
    }

    if (route.routeConfig.resolve.vehicles !== undefined) {
      const data = vehicles[vehicle];
      return scheduled([data], asapScheduler);
    }

    const types = vehicles[vehicle].reduce(
      (acc, item) => [
        ...acc,
        {
          brand: item.brand,
          logo: item.logo
        }
      ],
      []
    );

    return scheduled([types], asapScheduler);
  }
}
