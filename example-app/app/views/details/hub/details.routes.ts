import { Routes } from '@angular/router';
import { connectFeatures, createFeature } from 'lib';
import { DETAILS_NOTES_KEY, DetailsNotes } from './details.notes';
import { DetailsComponent } from '../components/details.component';
import { infoSlice } from '../../info/hub';

export const detailsRoutes: Routes = [
  {
    path: 'details',
    component: DetailsComponent
  },
  {
    path: 'info',
    loadChildren: () =>
      import('example-app/app/views/info/info.module').then(m => m.InfoModule)
  }
];

export const detailsSlice = createFeature<DetailsNotes>(detailsRoutes, {
  key: DETAILS_NOTES_KEY
});

connectFeatures<DetailsNotes, {}>(DETAILS_NOTES_KEY, {
  info: infoSlice
});
