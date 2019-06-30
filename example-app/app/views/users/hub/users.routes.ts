import { UsersComponent } from '../components/users.component';
import { UserComponent } from '../components/user.component';
import { ProfileComponent } from '../components/profile.component';
import { createFeature } from 'lib';
import { USERS_HUB_KEY, UsersChildNotes, UsersNotes } from './users.notes';

export const usersRoutes = [
  {
    path: 'users',
    children: [
      { path: '', component: UsersComponent },
      { path: ':id', component: UserComponent },
      { path: ':id/profile', component: ProfileComponent }
    ]
  }
];

export const usersSlice = createFeature<UsersNotes, UsersChildNotes>({
  routes: usersRoutes,
  key: USERS_HUB_KEY
});
