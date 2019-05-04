// tslint:disable:max-line-length
import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ATTRS } from './helpers';
import { Params } from '../interfaces';
import { forwardParams } from '../utils/state';
import { getRouteHref, getRouteLink } from '../utils/link';

@Directive({
  selector: `a[${ATTRS.LINK}],area[${ATTRS.LINK}]`
})
export class NavigationLinkWithHref {
  @Input(ATTRS.PARAMS) params: Params;

  @Input() set navLink(value: string | string[]) {
    this.link = getRouteLink(value);
    this.href = getRouteHref(this.link);
  }

  @HostBinding()
  public href: string;
  public link: string[];

  constructor(private router: Router) {}

  @HostListener('click')
  public onClick(): boolean {
    const link = this.params
      ? forwardParams(this.link, this.params)
      : this.link;
    this.router.navigate(link).catch(console.error);
    return false;
  }
}
