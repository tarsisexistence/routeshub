import { createRoot, Slice } from 'routeshub';

import { appNotes, AppNotes as R } from './app.notes';
import { AppChildrenNotes as C } from './app-children.notes';

/**
 * Hub initialization
 *
 * Creates and contains
 * stateful root routes
 */
export const appSlice: Slice<R, C> = createRoot<R, C>(appNotes);
