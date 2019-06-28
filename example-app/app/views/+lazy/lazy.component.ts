import { Component } from '@angular/core';

@Component({
  selector: 'app-lazy',
  template: `
    <nav>
      <a
        [routerLink]="['secondlevel']"
        [routerLinkActive]="['router-link-active']"
        >Second Level</a
      >
    </nav>
    <p>
      Lazy Text
    </p>
  `
})
export class LazyComponent {}
