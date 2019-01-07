import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Vehicle } from '../../core/interfaces/vehicle';

@Component({
  selector: 'app-automobile',
  templateUrl: './automobile.component.html',
  styleUrls: ['./automobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutomobileComponent implements OnInit, OnDestroy {
  public vehicles: Vehicle[];
  private unsubscribe$: Subject<boolean>;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.unsubscribe$ = new Subject<boolean>();

    this.route.data
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(({ vehicles }) => {
        this.vehicles = vehicles;
      });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
