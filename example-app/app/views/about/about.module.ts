import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { aboutRouting } from './hub';
import { AboutComponent } from './container/about.component';

@NgModule({
  declarations: [AboutComponent],
  imports: [CommonModule, aboutRouting]
})
export class AboutModule {}
