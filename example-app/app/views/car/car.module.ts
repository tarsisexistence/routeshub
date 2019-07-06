import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsModule } from '../details/details.module';
import { CarComponent } from './components/carComponent';
import { CarRoutingModule } from './hub/car-routing.module';

@NgModule({
  declarations: [CarComponent],
  imports: [CommonModule, DetailsModule, CarRoutingModule]
})
export class CarModule {}
