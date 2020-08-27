import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponentComponent } from './root-component.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RootComponentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: RootComponentComponent }
    ])
  ]
})
export class ThirdLazyChildModule { }
