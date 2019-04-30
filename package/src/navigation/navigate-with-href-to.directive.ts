// tslint:disable:max-line-length
import { Directive, HostListener, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { ATTRS } from './helpers';
import { Params } from '../interfaces';
import { forwardRouteParams } from '../utils/state';
import { splitPath } from '../utils/path';

@Directive({
  selector: `a[${ATTRS.LINK}],area[${ATTRS.LINK}]`
})
export class NavigateWithHrefTo extends RouterLinkWithHref {
  public link: string[];

  @Input() set navLink(link: string | string[]) {
    this.link = typeof link === 'string' ? splitPath(link) : link;
  }

  @Input(ATTRS.PARAMS) params: Params;
  private _router: Router;

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
      ? forwardRouteParams(this.link, this.params)
      : this.link;
    this._router.navigate(link).catch(console.error);
    return false;
  }
}
