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
        loadChildren: () =>
          import('example-app/app/views/about/about.module').then(
            m => m.AboutModule
          ),
        pathMatch: 'full'
      },
      {
        path: 'automobiles',
        // tslint:disable-next-line:max-line-length
        loadChildren: () =>
          import('example-app/app/views/automobile/automobile.module').then(
            m => m.AutomobileModule
          ),
        pathMatch: 'full'
      },
      {
        path: 'bikes',
        loadChildren: () =>
          import('example-app/app/views/bike/bike.module').then(
            m => m.BikeModule
          ),
        pathMatch: 'full'
      },
      {
        path: 'bolids',
        loadChildren: () =>
          import('example-app/app/views/bolid/bolid.module').then(
            m => m.BolidModule
          )
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
