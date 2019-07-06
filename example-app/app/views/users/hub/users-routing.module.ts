import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { createFeature } from 'lib';
import { USERS_NOTES_KEY, UsersChildNotes, UsersNotes } from './users.notes';
import { usersRoutes } from './users.routes';

export const usersSlice = createFeature<UsersNotes, UsersChildNotes>(
  usersRoutes,
  { key: USERS_NOTES_KEY }
);

@NgModule({
  imports: [RouterModule.forChild(usersRoutes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
