import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '~app/shared/shared.module';
import { bolidRouting } from './bolid.routes';
import { BolidComponent } from './bolid.component';

@NgModule({
  declarations: [BolidComponent],
  imports: [CommonModule, SharedModule, bolidRouting]
})
export class BolidModule {}
