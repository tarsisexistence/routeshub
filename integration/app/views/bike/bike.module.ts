import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { bikeRouting } from './bike.routes';
import { BikeComponent } from './containers/bike/bike.component';

@NgModule({
  declarations: [BikeComponent],
  imports: [CommonModule, bikeRouting]
})
export class BikeModule {}
