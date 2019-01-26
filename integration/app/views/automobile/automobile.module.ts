import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '~app/shared/shared.module';
import { automobilesRouting } from './automobile.routes';
import { AutomobileComponent } from './automobile.component';

@NgModule({
  declarations: [AutomobileComponent],
  imports: [CommonModule, SharedModule, automobilesRouting]
})
export class AutomobileModule {}
