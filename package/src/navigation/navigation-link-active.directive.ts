import {
  AfterContentInit,
  ContentChildren,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  QueryList,
  Renderer2
} from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavigationLink } from './navigation-link.directive';
import { NavigationLinkWithHref } from './navigation-link-with-href.directive';
import { getRouteHref } from '../utils/link';
import { getClassNames } from '../utils/helpers';
import { ATTRS } from './helpers';
import { Params } from '../interfaces';
import { insertHrefParams } from '../utils/state';

@Directive({
  selector: '[navLinkActive]',
  exportAs: 'navLinkActive'
})
export class NavigationLinkActive
  implements OnChanges, OnDestroy, AfterContentInit {
  @ContentChildren(NavigationLink, { descendants: true })
  public links!: QueryList<NavigationLink>;
  @ContentChildren(NavigationLinkWithHref, { descendants: true })
  public linksWithHrefs!: QueryList<NavigationLinkWithHref>;
  @Input(ATTRS.PARAMS) params: Params;

  @Input() navLinkActiveOptions: { exact: boolean } = { exact: false };

  @Input() set navLinkActive(input: string | string[]) {
    this.classNames = getClassNames(input);
  }

  private isActive = false;
  private classNames: string[] = [];
  private subscription: Subscription;

  constructor(
    private router: Router,
    private element: ElementRef,
    private renderer: Renderer2
  ) {
    this.subscription = router.events.subscribe((s: RouterEvent) => {
      if (s instanceof NavigationEnd) {
        this.update();
      }
    });
  }

  public ngAfterContentInit(): void {
    this.links.changes.subscribe(this.update);
    this.linksWithHrefs.changes.subscribe(this.update);
    this.update();
  }

  public ngOnChanges(): void {
    this.update();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private update(): void {
    if (!this.links || !this.linksWithHrefs || !this.router.navigated) {
      return;
    }

    Promise.resolve().then(() => {
      const hasActiveLinks = this.hasActiveLinks();
      if (this.isActive !== hasActiveLinks) {
        this.isActive = hasActiveLinks;
        this.classNames.forEach((className: string) => {
          if (hasActiveLinks) {
            this.renderer.addClass(this.element.nativeElement, className);
          } else {
            this.renderer.removeClass(this.element.nativeElement, className);
          }
        });
      }
    });
  }

  private hasActiveLinks(): boolean {
    return (
      this.links.some((instance: any) => this.isLinkActive(instance)) ||
      this.linksWithHrefs.some((instance: any) => this.isLinkActive(instance))
    );
  }

  private isLinkActive(instance: {
    link: string[];
    params: Params;
    href: string;
  }): boolean {
    const { url } = this.router;
    const { exact } = this.navLinkActiveOptions;
    const href = instance.href
      ? instance.href
      : insertHrefParams(getRouteHref(instance.link), instance.params);
    console.log(url, href);
    return exact ? url === href : url.includes(href);
  }
}
