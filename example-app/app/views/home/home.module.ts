import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home.component';
import { HomeRoutingModule } from './hub/home-routing.module';

@NgModule({
  imports: [CommonModule, HomeRoutingModule],
  declarations: [HomeComponent]
})
export class HomeModule {}
