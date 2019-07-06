import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { connectFeatures, createFeature } from 'lib';
import { DETAILS_NOTES_KEY, DetailsNotes } from './details.notes';
import { infoSlice } from '../../info/hub/info.hub';
import { detailsRoutes } from './details.routes';

export const detailsSlice = createFeature<DetailsNotes>(detailsRoutes, {
  key: DETAILS_NOTES_KEY
});

connectFeatures<DetailsNotes, {}>(DETAILS_NOTES_KEY, {
  info: infoSlice
});

@NgModule({
  imports: [RouterModule.forChild(detailsRoutes)],
  exports: [RouterModule]
})
export class DetailsHub {}
