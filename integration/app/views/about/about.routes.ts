import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about.component';

export const routes: Routes = [
  {
    path: '',
    component: AboutComponent,
    data: { a: 'b' }
  }
];

export const aboutRouting: ModuleWithProviders = RouterModule.forChild(routes);
