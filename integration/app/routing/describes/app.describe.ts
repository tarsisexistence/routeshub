import { Describe, Describes, Root } from 'routeshub';

import { about } from './about.describe';
import { automobile } from './automobile.describe';
import { bike } from './bike.describe';
import { bolid } from './bolid.describe';

/**
 * Describes App children route
 */
export interface AppChildrenRoute extends Root {
  about: Describe;
  automobile: Describe;
  bike: Describe;
  bolid: Describe;
}

/**
 * Declares App children routes
 */
const appChildrenRoute: Describes<AppChildrenRoute> = {
  root: { path: '' },
  about,
  automobile,
  bike,
  bolid
};

/**
 * Declares a type which contains
 * only one route with 'root' key
 */
export type AppRoute = Root;

/**
 * Declares App route
 * with one 'root' key
 * and children in the body
 */
export const appRoute: Describes<AppRoute, AppChildrenRoute> = {
  root: {
    path: '',
    children: appChildrenRoute
  }
};
