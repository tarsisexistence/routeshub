import { createRoot } from '../../../../package';
import { appBranch, AppBranch, AppChildrenBranch } from '../branches';

export const appSlice = createRoot<AppBranch, AppChildrenBranch>(
  appBranch,
  'app'
);
