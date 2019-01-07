import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { automobilesRouting } from './automobile.routes';
import { AutomobileComponent } from './automobile.component';

@NgModule({
  declarations: [AutomobileComponent],
  imports: [CommonModule, automobilesRouting]
})
export class AutomobileModule {}
