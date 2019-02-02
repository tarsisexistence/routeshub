import { createFeature, Slice } from 'routeshub';

import { appSlice } from '~app/routing/hub/app.slice';
import { bolidNotes, BolidRoutes as R } from '~app/views/bolid/hub/bolid.note';

/**
 * Creates feature slice
 */
export const bolidSlice: Slice<R> = createFeature<R>(
  appSlice.bolid,
  bolidNotes
);
