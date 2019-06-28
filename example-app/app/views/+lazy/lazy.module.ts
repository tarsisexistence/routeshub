import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyComponent } from './lazy.component';
import { LazyRoutingModule } from './lazy-routing.module';
import { SecondLevelComponent } from './second-level.component';

@NgModule({
  imports: [CommonModule, LazyRoutingModule],
  declarations: [LazyComponent, SecondLevelComponent]
})
export class LazyModule {}
