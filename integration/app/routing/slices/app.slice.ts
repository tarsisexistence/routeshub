import { createRoot } from '../../../../package';
import { appBranch, AppBranch, AppRootBranch } from '../branches';

export const appSlice = createRoot<AppBranch, AppRootBranch>(appBranch, 'app');
