import {
  Directive,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { Router } from '@angular/router';
import { ATTRS, QueryParamsHandling } from './helpers';
import { Params } from '../interfaces/common.interfaces';
import { getRouteHref, getRouteLink } from '../utils/link';
import { checkAttrActivity } from '../utils/helpers';
import { forwardParams } from '../functions/forward-params';

@Directive({
  selector: `a[${ATTRS.LINK}],area[${ATTRS.LINK}]`
})
export class NavigationLinkWithHref implements OnInit, OnChanges {
  @HostBinding() public href: string;
  @HostBinding('attr.target') @Input() target!: string;
  @Input() queryParams: { [k: string]: any } = {};
  @Input() queryParamsHandling: QueryParamsHandling = '';
  @Input() fragment!: string;
  @Input() preserveFragment!: boolean;
  @Input() skipLocationChange!: boolean;
  @Input() replaceUrl!: boolean;
  @Input() state?: { [k: string]: any };
  @Input(ATTRS.PARAMS) params: Params;
  @Input(ATTRS.LINK) link: string[];

  constructor(private router: Router) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.link) {
      this.link = getRouteLink(changes.link.currentValue);
    }

    if (changes.params) {
      this.href = getRouteHref(this.link, this.params);
    }
  }

  public ngOnInit(): void {
    if (this.params === undefined) {
      this.href = getRouteHref(this.link, this.params);
    }
  }

  @HostListener('click', [
    '$event.button',
    '$event.ctrlKey',
    '$event.metaKey',
    '$event.shiftKey'
  ])
  public onClick(
    button: number,
    ctrlKey: boolean,
    metaKey: boolean,
    shiftKey: boolean
  ): boolean {
    if (
      button !== 0 ||
      ctrlKey ||
      metaKey ||
      shiftKey ||
      (typeof this.target === 'string' && this.target !== '_self')
    ) {
      return true;
    }

    const extras = {
      skipLocationChange: checkAttrActivity(this.skipLocationChange),
      replaceUrl: checkAttrActivity(this.replaceUrl),
      queryParams: this.queryParams,
      queryParamsHandling: this.queryParamsHandling,
      state: this.state
    };
    const link = this.params
      ? forwardParams(this.link, this.params)
      : this.link;
    this.router.navigate(link, extras).catch(console.error);
    return false;
  }
}
