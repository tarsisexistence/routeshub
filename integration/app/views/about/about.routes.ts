import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AboutComponent } from './about.component';
import { aboutRoutes } from '~app/routing/notes';

/**
 * Declares routes on AboutModule level
 * Cool stuff with routes variables
 * can be used here to add control
 * over magic strings
 */
export const routes = [
  {
    path: aboutRoutes.root.path,
    component: AboutComponent
  }
];

export const aboutRouting: ModuleWithProviders = RouterModule.forChild(routes);
