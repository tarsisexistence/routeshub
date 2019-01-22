import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Slices } from 'routeshub';

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
  /**
   * Declares component's property
   * which will keep imported slices.
   * Autocomplete saved anyway
   */
  public slices: any;

  public ngOnInit(): void {
    /**
     * Nothing special.
     * Fill in slices and
     * component gets access to use
     * slices in template
     */
    this.slices = {
      aboutSlice,
      automobileSlice,
      bikeSlice,
      bolidSlice
    };
  }
}
