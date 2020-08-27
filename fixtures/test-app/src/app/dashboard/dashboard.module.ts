import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page.component';



@NgModule({
  declarations: [MainPageComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: DashboardModule }
    ]),
    CommonModule
  ]
})
export class DashboardModule { }
