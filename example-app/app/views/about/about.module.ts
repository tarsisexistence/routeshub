import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { aboutRoutes } from './hub';
import { AboutComponent } from './container/about.component';

@NgModule({
  declarations: [AboutComponent],
  imports: [CommonModule, RouterModule.forChild(aboutRoutes)]
})
export class AboutModule {}
