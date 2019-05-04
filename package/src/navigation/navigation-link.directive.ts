// tslint:disable:max-line-length
import {
  Attribute,
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ATTRS } from './helpers';
import { Params } from '../interfaces';
import { forwardParams } from '../utils/state';
import { getRouteLink } from '../utils/link';

@Directive({
  selector: `:not(a):not(area)[${ATTRS.LINK}]`
})
export class NavigationLink extends RouterLink {
  @Input(ATTRS.PARAMS) params: Params;

  @Input() set navLink(value: string | string[]) {
    this.link = getRouteLink(value);
  }

  public link: string[];
  private readonly _router: Router;

  constructor(
    router: Router,
    route: ActivatedRoute,
    @Attribute('tabindex') tabIndex: string,
    renderer: Renderer2,
    el: ElementRef
  ) {
    super(router, route, tabIndex, renderer, el);
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
