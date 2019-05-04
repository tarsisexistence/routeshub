import { createFeature, Slice } from '../../../../../package';

import { appSlice } from '~app/routing/hub/app.slice';
import { bolidNotes, BolidNotes as R } from './bolid.notes';

/**
 * Creates a feature slice
 */
export const bolidSlice: Slice<R> = createFeature<R>(
  appSlice.bolid,
  bolidNotes
);
