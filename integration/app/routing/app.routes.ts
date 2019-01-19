import { Routes } from '@angular/router';

import { hub } from './hub';
import { appRoute } from './routes';
import { VehiclesResolver } from './resolvers/vehicles.resolver';
import { ViewComponent } from '../core/containers/view/view.component';

export const routes: Routes = [
  {
    path: hub.app.root.path,
    component: ViewComponent,
    resolve: { types: VehiclesResolver },
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: appRoute.root.path,
        redirectTo: appRoute.root.children.about.path,
        pathMatch: 'full'
      },
      {
        path: appRoute.root.children.about.path,
        loadChildren: appRoute.root.children.about.lazyPath,
        pathMatch: 'full'
      },
      {
        path: appRoute.root.children.automobile.path,
        loadChildren: appRoute.root.children.automobile.lazyPath,
        pathMatch: 'full'
      },
      {
        path: appRoute.root.children.bike.path,
        loadChildren: appRoute.root.children.bike.lazyPath,
        pathMatch: 'full'
      },
      {
        path: appRoute.root.children.bolid.path,
        loadChildren: appRoute.root.children.bolid.lazyPath,
        pathMatch: 'full'
      }
    ]
  }
];
