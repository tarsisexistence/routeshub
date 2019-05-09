import { appNotes } from './app.notes';
import { VehiclesResolver } from '../resolvers/vehicles.resolver';
import { ViewComponent } from '../../core/containers/view/view.component';

/**
 * Declares routes on App level
 * Cool stuff with routes variables
 * can be used here to add control
 * over magic strings
 */
export const routes = [
  {
    path: appNotes.root.path,
    component: ViewComponent,
    resolve: { types: VehiclesResolver },
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: appNotes.root.path,
        redirectTo: appNotes.root.children.about.path,
        pathMatch: 'full'
      },
      {
        path: appNotes.root.children.about.path,
        loadChildren: appNotes.root.children.about.lazy,
        pathMatch: 'full'
      },
      {
        path: appNotes.root.children.automobile.path,
        loadChildren: appNotes.root.children.automobile.lazy,
        pathMatch: 'full'
      },
      {
        path: appNotes.root.children.bike.path,
        loadChildren: appNotes.root.children.bike.lazy,
        pathMatch: 'full'
      },
      {
        path: appNotes.root.children.bolid.path,
        loadChildren: appNotes.root.children.bolid.lazy
      }
    ]
  },
  {
    path: appNotes.notFound.path,
    redirectTo: appNotes.root.path
  }
];
