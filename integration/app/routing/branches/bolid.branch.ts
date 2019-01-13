import { BaseRoute, Routes } from '../../../../package';

export const bolid = {
  path: 'bolid',
  lazyPath: 'app/views/bolid/bolid.module#BolidModule'
};

export type BolidBranch = BaseRoute;

export const bolidBranch: Routes<BolidBranch> = {
  root: {
    path: ''
  }
};
