import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoComponent } from './components/info.component';
import { InfoRoutingModule } from './hub/info-routing.module';

@NgModule({
  imports: [CommonModule, InfoRoutingModule],
  declarations: [InfoComponent]
})
export class InfoModule {}
