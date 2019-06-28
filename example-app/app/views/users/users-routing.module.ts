import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './components/users.component';
import { UserComponent } from './components/user.component';
import { ProfileComponent } from './components/profile.component';
import { createRoot } from 'routeshub';

const usersRoutes = [
  {
    path: 'users',
    children: [
      { path: '', component: UsersComponent },
      { path: ':id', component: UserComponent },
      { path: ':id/profile', component: ProfileComponent }
    ]
  }
];

export const userSlice = createRoot(usersRoutes);

@NgModule({
  imports: [RouterModule.forChild(usersRoutes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
