import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Vehicle } from '~app/core/interfaces/vehicle';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VehicleComponent {
  @Input() public vehicle: Vehicle;
}
