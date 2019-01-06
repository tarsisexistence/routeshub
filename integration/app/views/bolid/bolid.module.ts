import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { bolidRouting } from './bolid.routes';
import { BolidComponent } from './containers/bolid/bolid.component';

@NgModule({
  declarations: [BolidComponent],
  imports: [CommonModule, bolidRouting]
})
export class BolidModule {}
