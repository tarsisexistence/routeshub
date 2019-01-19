import { BaseRoute, Route, Routes } from '../../../../package';

import { about } from './about.branch';
import { automobile } from './automobile.branch';
import { bike } from './bike.branch';
import { bolid } from './bolid.branch';

export interface AppChildrenBranch extends BaseRoute {
  about: Route;
  automobile: Route;
  bike: Route;
  bolid: Route;
}

const appChildrenBranch: Routes<AppChildrenBranch> = {
  root: { path: '' },
  about,
  automobile,
  bike,
  bolid
};

export type AppBranch = BaseRoute;

export const appBranch: Routes<AppBranch, AppChildrenBranch> = {
  root: {
    path: '',
    children: appChildrenBranch
  }
};
