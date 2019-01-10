import { hub } from '../../core/core.module';
import { appBranch, AppBranch } from '../branches';

export const appSlice = hub.createRoot<AppBranch>(appBranch);
