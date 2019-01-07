import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewComponent implements OnInit, OnDestroy {
  public vehicles: Observable<string[]>;
  private unsubscribe$: Subject<boolean>;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.unsubscribe$ = new Subject<boolean>();
    this.vehicles = this.route.data as Observable<string[]>;
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
