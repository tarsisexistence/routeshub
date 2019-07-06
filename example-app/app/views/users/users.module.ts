import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './components/users.component';
import { UserComponent } from './components/user.component';
import { ProfileComponent } from './components/profile.component';
import { NavigationModule } from 'routeshub';
import { UsersRoutingModule } from './hub/users-routing.module';

@NgModule({
  imports: [CommonModule, NavigationModule, UsersRoutingModule],
  declarations: [UsersComponent, UserComponent, ProfileComponent]
})
export class UsersModule {}
