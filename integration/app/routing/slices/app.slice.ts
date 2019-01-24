import { createRoot } from 'routeshub';

import { AppChildrenRoutes, appRoutes, AppRoutes } from '../describes';

/**
 * Creates and contains
 * stateful routes on root level.
 *
 * First interaction with routeshub
 */
export const appSlice = createRoot<AppRoutes, AppChildrenRoutes>(appRoutes);
