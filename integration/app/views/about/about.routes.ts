import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about.component';
import { aboutRoute } from '~app/core/routing/routes';

/**
 * Declares routes on AboutModule level
 * Cool stuff with routes variables
 * can be used here to add control
 * over magic strings
 */
export const routes: Routes = [
  {
    path: aboutRoute.root.path,
    component: AboutComponent
  }
];

export const aboutRouting: ModuleWithProviders = RouterModule.forChild(routes);
