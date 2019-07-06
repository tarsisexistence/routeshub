// tslint:disable:max-line-length
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { connectFeatures, createRoot } from 'lib';

import { routes } from './app.routes';
import { APP_NOTES_KEY, AppChildNotes, AppNotes } from './app.notes';
import { AboutNotes } from '../views/about/hub/about.notes';
import { aboutSlice } from '../views/about/hub/about-routing.module';
import { carSlice } from '../views/car/hub/car-routing.module';
import { CarNotes } from '../views/car/hub/car.notes';
import { DetailsNotes } from '../views/details/hub/details.notes';
import { homeSlice } from '../views/home/hub/home-routing.module';
import { HomeNotes } from '../views/home/hub/home.notes';
import { InfoNotes } from '../views/info/hub/info.notes';
import { usersSlice } from '../views/users/hub/users-routing.module';

/**
 * Creates stateful named App routes
 */
createRoot<AppNotes, AppChildNotes>(routes, {
  key: APP_NOTES_KEY,
  detached: {
    home: homeSlice,
    users: usersSlice
  }
});

/**
 * connects features which have attached relation
 * for this module
 *
 * {
 *  path: 'about'
 *  loadChildren: loadChildren: () => import('example-app/app/views/about/about.module').then(m => m.AboutModule)
 * }
 */
connectFeatures<AppNotes, AppChildNotes>(APP_NOTES_KEY, {
  about: aboutSlice,
  car: carSlice
});

/**
 * Describes the project's hubs
 */
export interface Hub {
  app: AppNotes & AppChildNotes;
  about: AboutNotes;
  car: CarNotes;
  details: DetailsNotes;
  home: HomeNotes;
  info: InfoNotes;
}

/**
 * Routing configuration
 */
export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  enableTracing: false,
  initialNavigation: 'enabled',
  onSameUrlNavigation: 'reload',
  scrollPositionRestoration: 'top'
});

/**
 * Routing module contains its configuration
 * and providers (resolvers, guard, interceptors etc)
 * and also exports RouterModule
 */
@NgModule({
  imports: [routing],
  exports: [RouterModule]
})
export class RoutingModule {}
