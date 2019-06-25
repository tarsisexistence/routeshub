import { Routes } from '@angular/router';
import { createFeature } from 'lib';
import { AboutComponent } from '../container/about.component';
import { ABOUT_HUB_KEY, AboutNotes } from './about.notes';

/**
 * Declares routes on AboutModule level
 */
export const aboutRoutes: Routes = [
  {
    path: '',
    component: AboutComponent
  }
];

export const aboutSlice = createFeature<AboutNotes>(aboutRoutes, ABOUT_HUB_KEY);
