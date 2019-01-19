import { createRoot } from '../../../../package';
import { AppChildrenRoute, appRoute, AppRoute } from '../routes';

export const appSlice = createRoot<AppRoute, AppChildrenRoute>(appRoute, 'app');
