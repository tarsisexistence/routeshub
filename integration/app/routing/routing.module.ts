import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewComponent } from '../core/containers/view/view.component';
import { VehiclesResolver } from './resolvers/vehicles.resolver';
import { appBranch } from './branches';
import { tree } from './tree';

export const routes: Routes = [
  {
    path: tree.app.root.path,
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

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  enableTracing: false,
  initialNavigation: 'enabled',
  onSameUrlNavigation: 'reload',
  scrollPositionRestoration: 'top'
});

@NgModule({
  imports: [routing],
  exports: [RouterModule],
  providers: [VehiclesResolver]
})
export class RoutingModule {}
