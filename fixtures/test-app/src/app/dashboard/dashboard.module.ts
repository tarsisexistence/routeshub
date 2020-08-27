import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page.component';
import { FirstChildrenComponent } from './first-children.component';

@NgModule({
  declarations: [MainPageComponent, FirstChildrenComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: MainPageComponent,
        children: [
          {
            path: '',
            component: FirstChildrenComponent
          }
        ]
      },
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
