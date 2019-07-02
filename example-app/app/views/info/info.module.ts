import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { infoRoutes } from './hub';
import { InfoComponent } from './components/info.component';

@NgModule({
  declarations: [InfoComponent],
  imports: [CommonModule, RouterModule.forChild(infoRoutes)]
})
export class InfoModule {}
