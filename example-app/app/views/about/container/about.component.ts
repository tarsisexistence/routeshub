import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Routeshub</h1>

    <img class="image" src="/assets/logo/origin.svg" alt="routeshub logo" />

    <h4>
      A minimal unit is made to simplify developers routes business
    </h4>
  `,
  styles: [
    `
      :host {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .image {
        margin-top: 10px;
        margin-bottom: 40px;
      }
    `
  ]
})
export class AboutComponent {}
