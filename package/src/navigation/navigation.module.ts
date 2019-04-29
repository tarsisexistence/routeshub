import { NgModule } from '@angular/core';
import { NavigateTo } from './navigate-to.directive';
import { NavigateWithHrefTo } from './navigate-with-href-to.directive';

const directives = [NavigateTo, NavigateWithHrefTo];

@NgModule({
  declarations: directives,
  exports: directives
})
export class NavigationModule {}
