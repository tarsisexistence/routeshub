import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VehiclesResolver } from './resolvers/vehicles.resolver';
import { routes } from './app.routes';

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
