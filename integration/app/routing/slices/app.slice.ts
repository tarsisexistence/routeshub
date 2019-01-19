import { createRoot } from 'routeshub';

import { AppChildrenRoute, appRoute, AppRoute } from '../routes';

export const appSlice = createRoot<AppRoute, AppChildrenRoute>(appRoute);
