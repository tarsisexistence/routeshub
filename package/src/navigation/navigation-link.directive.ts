// tslint:disable:max-line-length
import {
  Attribute,
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2
} from '@angular/core';
import { Router } from '@angular/router';
import { ATTRS } from './helpers';
import { Params } from '../interfaces';
import { forwardParams } from '../utils/state';
import { getRouteLink } from '../utils/link';

@Directive({
  selector: `:not(a):not(area)[${ATTRS.LINK}]`
})
export class NavigationLink {
  @Input(ATTRS.PARAMS) params: Params;

  @Input() set navLink(value: string | string[]) {
    this.link = getRouteLink(value);
  }

  public link: string[];

  constructor(
    private router: Router,
    @Attribute('tabindex') tabIndex: string,
    renderer: Renderer2,
    el: ElementRef
  ) {
    if (tabIndex == null) {
      renderer.setAttribute(el.nativeElement, 'tabindex', '0');
    }
  }

  @HostListener('click') onClick(): boolean {
    const link = this.params
      ? forwardParams(this.link, this.params)
      : this.link;
    this.router.navigate(link).catch(console.error);
    return false;
  }
}
