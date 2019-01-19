import { BaseRoute, Routes } from '../../../../package';

export const bike = {
  path: 'bikes',
  lazyPath: 'app/views/bike/bike.module#BikeModule'
};

export type BikeRoute = BaseRoute;

export const bikeRoute: Routes<BikeRoute> = {
  root: {
    path: ''
  }
};
