import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { bikeRouting } from './hub/bike.routes';
import { SharedModule } from '../../shared/shared.module';
import { BikeComponent } from './container/bike.component';

@NgModule({
  declarations: [BikeComponent],
  imports: [CommonModule, SharedModule, bikeRouting]
})
export class BikeModule {}
