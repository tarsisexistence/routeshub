import { createFeature, Slice } from 'routeshub';

import { appSlice } from '~app/routing/hub/app.slice';
import { bikeNotes, BikeRoutes as R } from './bike.note';

/**
 * Creates a feature slice
 */
export const bikeSlice: Slice<R> = createFeature<R>(appSlice.bike, bikeNotes);
