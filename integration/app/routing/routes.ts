import { Routes } from '@angular/router';

import { hub } from './hub';
import { appBranch } from './branches';
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
        path: appBranch.root.path,
        redirectTo: appBranch.root.children.about.path,
        pathMatch: 'full'
      },
      {
        path: appBranch.root.children.about.path,
        loadChildren: appBranch.root.children.about.lazyPath,
        pathMatch: 'full'
      },
      {
        path: appBranch.root.children.automobile.path,
        loadChildren: appBranch.root.children.automobile.lazyPath,
        pathMatch: 'full'
      },
      {
        path: appBranch.root.children.bike.path,
        loadChildren: appBranch.root.children.bike.lazyPath,
        pathMatch: 'full'
      },
      {
        path: appBranch.root.children.bolid.path,
        loadChildren: appBranch.root.children.bolid.lazyPath,
        pathMatch: 'full'
      }
    ]
  }
];
