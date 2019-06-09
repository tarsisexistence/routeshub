import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from '../container/about.component';

/**
 * Declares routes on AboutModule level
 */
export const routes: Routes = [
  {
    path: '',
    component: AboutComponent
  }
];

export const aboutRouting: ModuleWithProviders = RouterModule.forChild(routes);
