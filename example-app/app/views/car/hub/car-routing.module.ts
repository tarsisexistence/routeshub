import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { createFeature } from 'lib';
import { CAR_NOTES_KEY, CarNotes } from './car.notes';
import { carRoutes } from './car.routes';
import { detailsSlice } from '../../details/hub/details-routing.module';

export const carSlice = createFeature<CarNotes>(carRoutes, {
  detached: { details: detailsSlice },
  key: CAR_NOTES_KEY
});

@NgModule({
  imports: [RouterModule.forChild(carRoutes)],
  exports: [RouterModule]
})
export class CarRoutingModule {}
