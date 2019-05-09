import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Slices } from '../../../../../package';

import { Hub } from '../../../routing/hub/hub';
import { appSlice as app } from '../../../routing/hub/app.slice';
import { aboutSlice as about } from '../../../views/about/hub';
import { automobileSlice as automobile } from '../../../views/automobile/hub';
import { bikeSlice as bike } from '../../../views/bike/hub';
import { bolidSlice as bolid } from '../../../views/bolid/hub';

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
  public slices: Slices<Hub>;

  public ngOnInit(): void {
    /**
     * Nothing special.
     * Fill in slices.
     * Component will get access to use
     * slices in template
     */
    this.slices = {
      about,
      app,
      automobile,
      bike,
      bolid
    };
  }
}
