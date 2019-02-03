import { createRoot, Slice } from 'routeshub';

import { appNotes, AppRoutes as R } from './app.note';
import { AppChildrenRoutes as C } from './app-children.note';

/**
 * Hub initialization
 *
 * Creates and contains
 * stateful root routes
 */
export const appSlice: Slice<R, C> = createRoot<R, C>(appNotes);
