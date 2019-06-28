// tslint:disable:max-line-length
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  forwardParams,
  getHubSlices,
  getSlice,
  Slice,
  Sliced,
  Slices
} from 'lib';

import { Hub } from '../../../routing/routing.hub';
import { APP_HUB_KEY, AppChildNotes, AppNotes } from '../../../routing/hub';
import { AboutNotes } from '../../../views/about/hub';
import { CAR_HUB_KEY, CarNotes } from '../../../views/car/hub';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  /**
   * Declares component property
   * for template access reason
   */
  public hub: Slices<Hub>;

  // getting slice from function by key (slice name is available too)
  public car = getSlice<CarNotes>(CAR_HUB_KEY);

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
  }

  /**
   * navigation through
   * router.navigate and forwardParams
   */
  public freshCar(): void {
    this.router
      .navigate(forwardParams(this.hub.car.year.state, { year: 2019 }))
      .catch(console.error);
  }
}
