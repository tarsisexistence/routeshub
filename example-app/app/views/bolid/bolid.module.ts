import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { bolidRouting } from './hub';
import { SharedModule } from '~app/shared/shared.module';
import { BolidComponent } from './container/bolid.component';

@NgModule({
  declarations: [BolidComponent],
  imports: [CommonModule, SharedModule, bolidRouting]
})
export class BolidModule {}
