import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  createUnion,
  forwardParams,
  getHubSlices,
  getSlice,
  Slice,
  Sliced,
  Slices
} from 'lib';

import { Hub } from '../../../routing/routing.hub';
import { appSlice } from '../../../routing/hub/app.routes';
import { aboutSlice } from '../../../views/about/hub/about.routes';

import {
  APP_HUB_KEY,
  AppChildNotes,
  AppNotes
} from '../../../routing/hub/app.notes';
// tslint:disable-next-line:max-line-length
import { automobileSlice } from '../../../views/automobile/hub/automobile.routes';
import { bikeSlice } from '../../../views/bike/hub/bike.routes';
import { bolidSlice } from '../../../views/bolid/hub/bolid.routes';
import { AboutNotes } from '../../../views/about/hub/about.notes';
import {
  AUTOMOBILE_HUB_KEY,
  AutomobileNotes
} from '../../../views/automobile/hub/automobile.notes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  /**
   * Declares component property
   * for template access reason
   */
  public hub: Slices<Hub>;
  public union;

  // getting slice from function by key (slice name is available too)
  public automobiles = getSlice<AutomobileNotes>(AUTOMOBILE_HUB_KEY);

  // getting slice by key
  @Sliced(APP_HUB_KEY)
  private app: Slice<AppNotes, AppChildNotes>;

  // getting slice by slice name
  @Sliced('about')
  private about: Slice<AboutNotes>;

  constructor(private router: Router) {}

  public ngOnInit(): void {
    /**
     * Getting access to use slices in template
     */
    this.hub = getHubSlices<Hub>();

    /**
     * creating union to get access
     * and pick slices on demand
     * as union
     */
    this.union = createUnion({
      app: appSlice,
      about: aboutSlice,
      automobiles: automobileSlice,
      bikes: bikeSlice,
      bolids: bolidSlice
    });
  }

  public freshBolids(): void {
    this.router
      .navigate(forwardParams(this.union.bolids.year.state, { year: 2019 }))
      .catch(console.error);
  }
}
