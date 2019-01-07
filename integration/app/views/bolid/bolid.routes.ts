import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BolidComponent } from './containers/bolid/bolid.component';

export const routes: Routes = [
  {
    path: '',
    component: BolidComponent
  }
];

export const bolidRouting: ModuleWithProviders = RouterModule.forChild(routes);
