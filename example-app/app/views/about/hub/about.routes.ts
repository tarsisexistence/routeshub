import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { createFeature } from 'lib';
import { AboutComponent } from '../container/about.component';
import { appSlice } from '../../../routing/hub/app.routes';
import { ABOUT_HUB_KEY, AboutNotes } from './about.hub';

/**
 * Declares routes on AboutModule level
 */
export const routes: Routes = [
  {
    path: '',
    component: AboutComponent
  }
];

export const aboutRouting: ModuleWithProviders = RouterModule.forChild(routes);

export const aboutSlice = createFeature<AboutNotes>(
  appSlice.about,
  routes,
  ABOUT_HUB_KEY
);
