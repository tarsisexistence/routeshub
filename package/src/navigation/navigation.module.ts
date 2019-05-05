import { NgModule } from '@angular/core';
import { NavigationLink } from './navigation-link.directive';
import { NavigationLinkWithHref } from './navigation-link-with-href.directive';
import { NavigationLinkActive } from './navigation-link-active.directive';

const directives = [
  NavigationLink,
  NavigationLinkWithHref,
  NavigationLinkActive
];

/**
 * wrapper module to declare lib directives
 */
@NgModule({
  declarations: directives,
  exports: directives
})
export class NavigationModule {}
