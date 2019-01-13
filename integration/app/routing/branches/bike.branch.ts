import { BaseRoute, Routes } from '../../../../package';

export const bike = {
  path: 'bike',
  lazyPath: 'app/views/bike/bike.module#BikeModule'
};

export type BikeBranch = BaseRoute;

export const bikeBranch: Routes<BikeBranch> = {
  root: {
    path: ''
  }
};
