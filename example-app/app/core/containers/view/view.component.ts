import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { Slice, Sliced } from 'lib';
import {
  APP_HUB_KEY,
  AppChildNotes,
  AppNotes
} from '../../../routing/hub/app.notes';
import {
  BOLID_HUB_KEY,
  BolidNotes
} from '../../../views/bolid/hub/bolid.notes';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewComponent implements OnInit, OnDestroy {
  public vehicles: Observable<string[]>;
  private unsubscribe$: Subject<boolean>;

  @Sliced(APP_HUB_KEY)
  private app: Slice<AppNotes, AppChildNotes>;

  @Sliced(BOLID_HUB_KEY)
  private bolid: Slice<BolidNotes>;

  constructor(private readonly route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.unsubscribe$ = new Subject<boolean>();
    this.vehicles = this.route.data as Observable<string[]>;
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
