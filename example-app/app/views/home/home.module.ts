import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { homeRoutes } from './hub';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(homeRoutes)],
  declarations: [HomeComponent]
})
export class HomeModule {}
