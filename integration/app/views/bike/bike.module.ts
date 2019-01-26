import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '~app/shared/shared.module';
import { bikeRouting } from './bike.routes';
import { BikeComponent } from './bike.component';

@NgModule({
  declarations: [BikeComponent],
  imports: [CommonModule, SharedModule, bikeRouting]
})
export class BikeModule {}
