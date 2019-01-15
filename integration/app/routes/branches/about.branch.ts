import { BaseRoute, Routes } from '../../../../package';

export const about = {
  path: 'about',
  lazyPath: 'app/views/about/about.module#AboutModule'
};

export type AboutBranch = BaseRoute;

export const aboutBranch: Routes<AboutBranch> = {
  root: {
    path: ''
  }
};
