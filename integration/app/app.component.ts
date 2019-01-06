import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-content></app-content>
  `
})
export class AppComponent implements OnInit {
  constructor() {}

  public ngOnInit(): void {}
}
