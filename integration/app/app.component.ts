import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Our main AppComponent to bootstrap application
 * and outlet our router configurations
 */
@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
