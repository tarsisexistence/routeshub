import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { automobilesRouting } from './hub';
import { SharedModule } from '../../shared/shared.module';
import { AutomobileComponent } from './container/automobile.component';

@NgModule({
  declarations: [AutomobileComponent],
  imports: [CommonModule, SharedModule, automobilesRouting]
})
export class AutomobileModule {}
