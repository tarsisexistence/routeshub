import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './components/users.component';
import { UserComponent } from './components/user.component';
import { ProfileComponent } from './components/profile.component';
import { NavigationModule } from 'routeshub';
import { usersRoutes } from './hub';

@NgModule({
  imports: [CommonModule, NavigationModule, RouterModule.forChild(usersRoutes)],
  declarations: [UsersComponent, UserComponent, ProfileComponent]
})
export class UsersModule {}
