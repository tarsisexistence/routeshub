import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-automobile',
  templateUrl: './automobile.component.html',
  styleUrls: ['./automobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutomobileComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
