import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page.component';

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: MainPageComponent },
      {
        path: 'licenses',
        loadChildren: () =>
          import('./licences/licences.module').then(m => m.LicencesModule)
      }
    ]),
    CommonModule
  ]
})
export class DashboardModule {}
