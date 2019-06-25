import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2>Details</h2>
  `
})
export class DetailsComponent {}
