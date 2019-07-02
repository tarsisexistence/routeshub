import { Routes } from '@angular/router';
import { createFeature } from 'lib';
import { DETAILS_HUB_KEY, DetailsNotes } from './details.notes';
import { DetailsComponent } from '../components/details.component';

/**
 * Declares routes on AboutModule level
 */
export const detailsRoutes: Routes = [
  {
    path: 'details',
    component: DetailsComponent
  }
];

export const detailsSlice = createFeature<DetailsNotes>(detailsRoutes, {
  key: DETAILS_HUB_KEY
});
