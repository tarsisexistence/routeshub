import { Routes } from '@angular/router';

import { connectFeatures, createRoot } from 'lib';

import { ViewComponent } from '../../core/components/view/view.component';
import { APP_NOTES_KEY, AppChildNotes, AppNotes } from './app.notes';
import { aboutSlice } from '../../views/about/hub';
import { carSlice } from '../../views/car/hub';
import { homeSlice } from '../../views/home/hub';
import { usersSlice } from '../../views/users/hub';

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
          )
      },
      {
        path: 'car',
        loadChildren: () =>
          import('example-app/app/views/car/car.module').then(m => m.CarModule)
      }
    ]
  }
];

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

connectFeatures<AppNotes, AppChildNotes>(APP_NOTES_KEY, {
  about: aboutSlice,
  car: carSlice
});
