import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AboutComponent } from '../container/about.component';
import { aboutNotes } from './about.note';

/**
 * Declares routes on AboutModule level
 */
export const routes = [
  {
    path: aboutNotes.root.path,
    component: AboutComponent
  }
];

export const aboutRouting: ModuleWithProviders = RouterModule.forChild(routes);
