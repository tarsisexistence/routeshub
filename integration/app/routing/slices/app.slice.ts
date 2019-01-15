import { hub } from '../';

import { appBranch, AppBranch, AppRootBranch } from '../branches';

const route = 'app';
export const appSlice = hub.createRoot<AppBranch, AppRootBranch>(
  appBranch,
  route
);
