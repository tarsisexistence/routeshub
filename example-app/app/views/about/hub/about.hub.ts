import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { createFeature } from 'lib';
import { ABOUT_NOTES_KEY, AboutNotes } from './about.notes';
import { aboutRoutes } from './about.routes';

export const aboutConnector = createFeature<AboutNotes>(aboutRoutes, {
  key: ABOUT_NOTES_KEY
});

@NgModule({
  imports: [RouterModule.forChild(aboutRoutes)],
  exports: [RouterModule]
})
export class AboutHub {}
