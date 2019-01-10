import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiclesResolver } from './vehicles.resolver';
import { ViewComponent } from '../core/containers/view/view.component';
import { TREE } from './hub';
console.log({ TREE });
export const routes: Routes = [
  {
    path: TREE.app.root.path,
    component: ViewComponent,
    resolve: { types: VehiclesResolver },
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'about'
      },
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
