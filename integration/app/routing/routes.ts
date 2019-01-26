import { hub } from './hub';
import { appRoutes } from './notes';
import { VehiclesResolver } from './resolvers/vehicles.resolver';
import { ViewComponent } from '../core/containers/view/view.component';

/**
 * Declares routes on root level
 * Cool stuff with routes variables
 * can be used here to add control
 * over magic strings
 */
export const routes = [
  {
    path: hub.app.root.path,
    component: ViewComponent,
    resolve: { types: VehiclesResolver },
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: appRoutes.root.path,
        redirectTo: appRoutes.root.children.about.path,
        pathMatch: 'full'
      },
      {
        path: appRoutes.root.children.about.path,
        loadChildren: appRoutes.root.children.about.lazyPath,
        pathMatch: 'full'
      },
      {
        path: appRoutes.root.children.automobile.path,
        loadChildren: appRoutes.root.children.automobile.lazyPath,
        pathMatch: 'full'
      },
      {
        path: appRoutes.root.children.bike.path,
        loadChildren: appRoutes.root.children.bike.lazyPath,
        pathMatch: 'full'
      },
      {
        path: appRoutes.root.children.bolid.path,
        loadChildren: appRoutes.root.children.bolid.lazyPath,
        pathMatch: 'full'
      }
    ]
  }
];
