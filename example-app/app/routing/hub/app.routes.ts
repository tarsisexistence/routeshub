import { Routes } from '@angular/router';
import { VehiclesResolver } from '../resolvers/vehicles.resolver';
import { ViewComponent } from '../../core/containers/view/view.component';

/**
 * Declares routes on App level
 * Cool stuff with routes variables
 * can be used here to add control
 * over magic strings
 */
export const routes: Routes = [
  {
    path: '',
    component: ViewComponent,
    resolve: { types: VehiclesResolver },
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: '',
        redirectTo: 'about',
        pathMatch: 'full'
      },
      {
        path: 'about',
        loadChildren: 'example-app/app/views/about/about.module#AboutModule',
        pathMatch: 'full'
      },
      {
        path: 'automobiles',
        // tslint:disable-next-line:max-line-length
        loadChildren:
          'example-app/app/views/automobile/automobile.module#AutomobileModule',
        pathMatch: 'full'
      },
      {
        path: 'bikes',
        loadChildren: 'example-app/app/views/bike/bike.module#BikeModule',
        pathMatch: 'full'
      },
      {
        path: 'bolids',
        loadChildren: 'example-app/app/views/bolid/bolid.module#BolidModule'
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
