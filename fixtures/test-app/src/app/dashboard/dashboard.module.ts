import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page.component';
import { FirstChildrenComponent } from './first-children.component';
import { SecondChildrenComponent } from './second-children.component';

@NgModule({
  declarations: [MainPageComponent, FirstChildrenComponent, SecondChildrenComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: MainPageComponent,
        children: [
          {
            path: '',
            component: FirstChildrenComponent
          },
          {
            path: 'second-child',
            component: SecondChildrenComponent
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
