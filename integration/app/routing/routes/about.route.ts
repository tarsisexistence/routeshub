import { BaseRoute, Routes } from '../../../../package';

export const about = {
  path: 'about',
  lazyPath: 'app/views/about/about.module#AboutModule'
};

export type AboutRoute = BaseRoute;

export const aboutRoute: Routes<AboutRoute> = {
  root: {
    path: ''
  }
};
