import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LazyComponent } from './lazy.component';
import { SecondLevelComponent } from './second-level.component';

const lazyRoutes = [
  { path: '', component: LazyComponent },
  { path: 'secondlevel', component: SecondLevelComponent }
];

@NgModule({
  imports: [RouterModule.forChild(lazyRoutes)],
  exports: [RouterModule]
})
export class LazyRoutingModule {}
