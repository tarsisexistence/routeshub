import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AdminPanelComponent],
  imports: [CommonModule, RouterModule]
})
export class AdminPanelModule {}
