import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './components/users.component';
import { UserComponent } from './components/user.component';
import { ProfileComponent } from './components/profile.component';
import { UsersRoutingModule } from './users-routing.module';
import { NavigationModule } from 'routeshub';

@NgModule({
  imports: [CommonModule, UsersRoutingModule, NavigationModule],
  declarations: [UsersComponent, UserComponent, ProfileComponent]
})
export class UsersModule {}
