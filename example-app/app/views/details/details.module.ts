import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { detailsRoutes } from './hub';
import { DetailsComponent } from './container/details.component';

@NgModule({
  declarations: [DetailsComponent],
  imports: [CommonModule, RouterModule.forChild(detailsRoutes)]
})
export class DetailsModule {}
