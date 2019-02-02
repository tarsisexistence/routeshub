import { createFeature, Slice } from 'routeshub';

import { appSlice } from '~app/routing/hub/app.slice';
import {
  automobileNotes,
  AutomobileRoutes as R
} from '~app/views/automobile/hub/automobile.note';

/**
 * Creates feature slice
 */
export const automobileSlice: Slice<R> = createFeature<R>(
  appSlice.automobile,
  automobileNotes
);
