import { BaseRoute, Routes } from '../../../../package';

export const automobile = {
  path: 'automobiles',
  lazyPath: 'app/views/automobile/automobile.module#AutomobileModule'
};

export type AutomobileBranch = BaseRoute;

export const automobileBranch: Routes<AutomobileBranch> = {
  root: {
    path: ''
  }
};
