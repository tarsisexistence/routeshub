import { hub } from '../../core/core.module';
import { appBranch, AppBranch, AppRootBranch } from '../branches';

const route = 'app';
export const appSlice = hub.createRoot<AppBranch, AppRootBranch>(
  appBranch,
  route
);
