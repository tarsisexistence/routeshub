import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-bike',
  templateUrl: './bike.component.html',
  styleUrls: ['./bike.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BikeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
