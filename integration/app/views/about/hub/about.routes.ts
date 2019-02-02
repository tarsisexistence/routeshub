import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AboutComponent } from '../container/about.component';
import { aboutNote } from './about.note';

/**
 * Declares routes on AboutModule level
 * Cool stuff with routes variables
 * can be used here to add control
 * over magic strings
 */
export const routes = [
  {
    path: aboutNote.root.path,
    component: AboutComponent
  }
];

export const aboutRouting: ModuleWithProviders = RouterModule.forChild(routes);
