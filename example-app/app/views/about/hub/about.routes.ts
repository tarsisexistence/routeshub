import { Routes } from '@angular/router';
import { createFeature } from 'routeshub';
import { AboutComponent } from '../components/about.component';
import { ABOUT_NOTES_KEY, AboutNotes } from './about.notes';

/**
 * Declares routes on AboutModule level
 */
export const aboutRoutes: Routes = [
  {
    path: '',
    component: AboutComponent
  }
];
