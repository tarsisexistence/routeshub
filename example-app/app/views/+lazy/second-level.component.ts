import { Component } from '@angular/core';

@Component({
  selector: 'app-second-level',
  template: `
    <nav>
      <a [routerLink]="['../']">Back</a>
    </nav>
    <p>
      second-level works! (translation skipped intentionally)
    </p>
  `
})
export class SecondLevelComponent {}
