import { BaseRoute, Route, Routes } from '../../../../package';

import { about } from './about.route';
import { automobile } from './automobile.route';
import { bike } from './bike.route';
import { bolid } from './bolid.route';

export interface AppChildrenRoute extends BaseRoute {
  about: Route;
  automobile: Route;
  bike: Route;
  bolid: Route;
}

const appChildrenRoute: Routes<AppChildrenRoute> = {
  root: { path: '' },
  about,
  automobile,
  bike,
  bolid
};

export type AppRoute = BaseRoute;

export const appRoute: Routes<AppRoute, AppChildrenRoute> = {
  root: {
    path: '',
    children: appChildrenRoute
  }
};
