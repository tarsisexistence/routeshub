import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './containers/about/about.component';

export const routes: Routes = [
  {
    path: '',
    component: AboutComponent
  }
];

export const aboutRouting: ModuleWithProviders = RouterModule.forChild(routes);
