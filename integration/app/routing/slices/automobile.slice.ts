import { createFeature, Entity } from '../../../../package';

import { automobileBranch, AutomobileBranch } from '../branches';
import { appSlice } from './app.slice';

export const automobileSlice: Entity<AutomobileBranch> = createFeature<
  AutomobileBranch
>(appSlice.automobile, automobileBranch);
