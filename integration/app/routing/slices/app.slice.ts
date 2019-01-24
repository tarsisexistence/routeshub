import { createRoot } from 'routeshub';

import { AppChildrenRoute, appRoute, AppRoute } from '../describes';

/**
 * Creates and contains
 * stateful routes on root level.
 *
 * First interaction with routeshub
 */
export const appSlice = createRoot<AppRoute, AppChildrenRoute>(appRoute);
