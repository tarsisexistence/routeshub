// tslint:disable:max-line-length
import { Directive, HostListener, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { ATTRS } from './helpers';
import { Params } from '../interfaces';
import { forwardParams } from '../utils/state';
import { getRouteLink } from '../utils/link';

@Directive({
  selector: `a[${ATTRS.LINK}],area[${ATTRS.LINK}]`
})
export class NavigationLinkWithHref extends RouterLinkWithHref {
  @Input(ATTRS.PARAMS) params: Params;

  @Input() set navLink(value: string | string[]) {
    this.link = getRouteLink(value);
  }

  public link: string[];
  private readonly _router: Router;

  constructor(
    router: Router,
    route: ActivatedRoute,
    locationStrategy: LocationStrategy
  ) {
    super(router, route, locationStrategy);
    this._router = router;
  }

  @HostListener('click') onClick(): boolean {
    const link = this.params
      ? forwardParams(this.link, this.params)
      : this.link;
    this._router.navigate(link).catch(console.error);
    return false;
  }
}
