import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { createUnion, forwardParams, Slices } from 'lib';

import { Hub, hub } from '../../../routing/hub';
import { appSlice } from '../../../routing/hub/app.hub';
import { aboutSlice } from '../../../views/about/hub';
import { automobileSlice } from '../../../views/automobile/hub';
import { bikeSlice } from '../../../views/bike/hub';
import { bolidSlice } from '../../../views/bolid/hub';

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

  constructor(private router: Router) {}

  public ngOnInit(): void {
    /**
     * Getting access to use slices in template
     */
    this.hub = hub;

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
