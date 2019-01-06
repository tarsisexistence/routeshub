import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'about',
    pathMatch: 'full',
    loadChildren: 'app/views/about/about.module#AboutModule'
  },
  {
    path: 'automobiles',
    pathMatch: 'full',
    loadChildren: 'app/views/automobile/automobile.module#AutomobileModule'
  },
  {
    path: 'bikes',
    pathMatch: 'full',
    loadChildren: 'app/views/bike/bike.module#BikeModule'
  },
  {
    path: 'bolids',
    pathMatch: 'full',
    loadChildren: 'app/views/bolid/bolid.module#BolidModule'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  enableTracing: false,
  initialNavigation: 'enabled',
  onSameUrlNavigation: 'reload',
  scrollPositionRestoration: 'top'
});
