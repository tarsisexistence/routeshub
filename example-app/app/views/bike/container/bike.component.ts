import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Vehicle } from 'example-app/app/core/interfaces/vehicle.interface';

@Component({
  selector: 'app-bike',
  templateUrl: './bike.component.html',
  styleUrls: ['./bike.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BikeComponent implements OnInit, OnDestroy {
  public vehicles: Vehicle[];
  private unsubscribe$: Subject<boolean>;

  constructor(private readonly route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.unsubscribe$ = new Subject<boolean>();

    this.route.data
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(({ vehicles }) => {
        this.vehicles = vehicles;
      });
  }

  public identify(index, item: Vehicle): string {
    return item.name;
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
