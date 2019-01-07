import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiclesResolver } from './vehicles.resolver';
import { AppComponent } from '../app.component';
import { ViewComponent } from '../core/containers/view/view.component';

export const routes: Routes = [
  {
    path: '',
    component: ViewComponent,
    resolve: { types: VehiclesResolver },
    runGuardsAndResolvers: 'always',
    children: [
      { path: '', redirectTo: 'about', pathMatch: 'full' },
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
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  enableTracing: false,
  initialNavigation: 'enabled',
  onSameUrlNavigation: 'reload',
  scrollPositionRestoration: 'top'
});
