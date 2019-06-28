import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { carRoutes } from './hub';
import { CarComponent } from './components/carComponent';

@NgModule({
  declarations: [CarComponent],
  imports: [CommonModule, RouterModule.forChild(carRoutes)]
})
export class CarModule {}
