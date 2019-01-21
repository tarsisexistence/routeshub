import { createFeature, Slice } from 'routeshub';

import { automobileRoute, AutomobileRoute } from '../routes';
import { appSlice } from './app.slice';

export const automobileSlice: Slice<AutomobileRoute> = createFeature<
  AutomobileRoute
>(appSlice.automobile, automobileRoute);
