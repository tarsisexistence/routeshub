import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleComponent } from './components/vehicle/vehicle.component';

/**
 * Plain SharedModule.
 * Actually just for structure example
 */
@NgModule({
  imports: [CommonModule],
  declarations: [VehicleComponent],
  exports: [VehicleComponent]
})
export class SharedModule {}
