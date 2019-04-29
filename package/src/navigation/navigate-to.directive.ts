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
import { forwardRouteParams } from '../utils/state';
import { splitPath } from '../utils/path';

@Directive({
  selector: `:not(a):not(area)[${ATTRS.LINK}]`
})
export class NavigateTo extends RouterLink {
  @Input() set [ATTRS.LINK](link: string | string[]) {
    this.link = typeof link === 'string' ? splitPath(link) : link;
  }

  @Input(ATTRS.PARAMS) params: Params;
  public link: string[];
  private _router: Router;

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
      ? forwardRouteParams(this.link, this.params)
      : this.link;
    this._router.navigate(link).catch(console.error);
    return false;
  }
}
