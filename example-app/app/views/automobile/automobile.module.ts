import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { automobileRoutes } from './hub';
import { SharedModule } from '../../shared/shared.module';
import { AutomobileComponent } from './container/automobile.component';

@NgModule({
  declarations: [AutomobileComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(automobileRoutes)]
})
export class AutomobileModule {}
