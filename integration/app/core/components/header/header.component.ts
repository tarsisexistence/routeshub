import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { aboutSlice } from '~app/views/about/hub';
import { appSlice } from '~app/routing/hub/app.slice';
import { automobileSlice } from '~app/views/automobile/hub';
import { bikeSlice } from '~app/views/bike/hub';
import { bolidSlice } from '~app/views/bolid/hub';

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
     * Fill in slices.
     * Component will get access to use
     * slices in template
     */
    this.slices = {
      aboutSlice,
      appSlice,
      automobileSlice,
      bikeSlice,
      bolidSlice
    };
  }
}
