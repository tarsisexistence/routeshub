import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { bolidRoutes } from './hub';
import { SharedModule } from '../../shared/shared.module';
import { BolidComponent } from './container/bolid.component';

@NgModule({
  declarations: [BolidComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(bolidRoutes)]
})
export class BolidModule {}
