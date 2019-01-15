import { Entity } from '../../../../package';
import { hub } from '../';

import { automobileBranch, AutomobileBranch } from '../branches';
import { appSlice } from './app.slice';

export const automobileSlice: Entity<AutomobileBranch> = hub.createFeature<
  AutomobileBranch
>(appSlice.automobile, automobileBranch);
