import { createFeature, Entity } from '../../../../dist/routeshub';

import { automobileRoute, AutomobileRoute } from '../routes';
import { appSlice } from './app.slice';

export const automobileSlice: Entity<AutomobileRoute> = createFeature<
  AutomobileRoute
>(appSlice.automobile, automobileRoute);
