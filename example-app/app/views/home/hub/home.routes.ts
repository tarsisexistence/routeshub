import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home.component';
import { createFeature } from 'lib';
import { HOME_NOTES_KEY, HomeNotes } from './home.notes';

export const homeRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  }
];

export const homeSlice = createFeature<HomeNotes>(homeRoutes, {
  key: HOME_NOTES_KEY
});
