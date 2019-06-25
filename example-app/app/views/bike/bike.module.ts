import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { bikeRoutes } from './hub';
import { SharedModule } from '../../shared/shared.module';
import { BikeComponent } from './container/bike.component';

@NgModule({
  declarations: [BikeComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(bikeRoutes)]
})
export class BikeModule {}
