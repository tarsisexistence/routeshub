import { Routes } from '@angular/router';
import { createFeature } from 'lib';
import { DETAILS_HUB_KEY, DetailsNotes } from './details.notes';
import { DetailsComponent } from '../container/details.component';

/**
 * Declares routes on AboutModule level
 */
export const detailsRoutes: Routes = [
  {
    path: '',
    component: DetailsComponent
  }
];

export const detailsSlice = createFeature<DetailsNotes>(
  detailsRoutes,
  DETAILS_HUB_KEY
);
