import { BaseRoute, Routes } from 'routeshub';

export const automobile = {
  path: 'automobiles',
  lazyPath: 'app/views/automobile/automobile.module#AutomobileModule'
};

export type AutomobileRoute = BaseRoute;

export const automobileRoute: Routes<AutomobileRoute> = {
  root: {
    path: ''
  }
};
