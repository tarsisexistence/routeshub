import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsComponent } from './components/details.component';
import { DetailsRoutingModule } from './hub/details-routing.module';

@NgModule({
  declarations: [DetailsComponent],
  imports: [CommonModule, DetailsRoutingModule]
})
export class DetailsModule {}
