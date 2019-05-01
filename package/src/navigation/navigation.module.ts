import { NgModule } from '@angular/core';
import { NavigationLink } from './navigation-link.directive';
import { NavigationLinkWithHref } from './navigation-link-with-href.directive';

const directives = [NavigationLink, NavigationLinkWithHref];

@NgModule({
  declarations: directives,
  exports: directives
})
export class NavigationModule {}
