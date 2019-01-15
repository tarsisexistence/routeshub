import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import {
  aboutSlice,
  automobileSlice,
  bikeSlice,
  bolidSlice
} from '../../../routing/slices';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  public slices: any;

  public ngOnInit(): void {
    this.slices = {
      aboutSlice,
      automobileSlice,
      bikeSlice,
      bolidSlice
    };
  }
}
