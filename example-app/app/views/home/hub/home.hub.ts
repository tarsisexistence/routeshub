import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { createFeature } from 'lib';
import { HOME_NOTES_KEY, HomeNotes } from './home.notes';
import { homeRoutes } from './home.routes';

export const homeUnit = createFeature<HomeNotes>(homeRoutes, {
  key: HOME_NOTES_KEY
});

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule]
})
export class HomeHub {}
