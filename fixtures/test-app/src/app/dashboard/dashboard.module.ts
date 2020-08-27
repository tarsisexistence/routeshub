import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page.component';
import { FirstChildComponent } from './first-child.component';
import { SecondChildComponent } from './second-child.component';

@NgModule({
  declarations: [MainPageComponent, FirstChildComponent, SecondChildComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: MainPageComponent,
        children: [
          {
            path: '',
            component: FirstChildComponent
          },
          {
            path: 'second-child',
            component: SecondChildComponent
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
