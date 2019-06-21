import {
  Attribute,
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2
} from '@angular/core';
import { Router } from '@angular/router';
import { ATTRS, QueryParamsHandling } from './helpers';
import { Params } from '../interfaces';
import { getRouteLink } from '../utils/link';
import { checkAttrActivity } from '../utils/helpers';
import { forwardParams } from '../functions/forward-params';

@Directive({
  selector: `:not(a):not(area)[${ATTRS.LINK}]`
})
export class NavigationLink {
  @Input() queryParams!: { [k: string]: any };
  @Input() fragment!: string;
  @Input() queryParamsHandling!: QueryParamsHandling;
  @Input() preserveFragment!: boolean;
  @Input() skipLocationChange!: boolean;
  @Input() replaceUrl!: boolean;
  @Input() state?: { [k: string]: any };
  @Input(ATTRS.PARAMS) params: Params;

  @Input() set navLink(value: string | string[]) {
    this.link = getRouteLink(value);
  }

  @Input()
  set preserveQueryParams(value: boolean) {
    this.preserve = value;
  }

  public link: string[];
  private preserve!: boolean;

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
    const extras = {
      skipLocationChange: checkAttrActivity(this.skipLocationChange),
      replaceUrl: checkAttrActivity(this.replaceUrl)
    };
    const link = this.params
      ? forwardParams(this.link, this.params)
      : this.link;
    this.router.navigate(link, extras).catch(console.error);
    return false;
  }
}
