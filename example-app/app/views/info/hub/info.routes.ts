import { Routes } from '@angular/router';
import { createFeature } from 'lib';
import { INFO_NOTES_KEY, InfoNotes } from './info.notes';
import { InfoComponent } from '../components/info.component';

export const infoRoutes: Routes = [
  {
    path: 'info',
    component: InfoComponent
  }
];

export const infoSlice = createFeature<InfoNotes>(infoRoutes, {
  key: INFO_NOTES_KEY
});
