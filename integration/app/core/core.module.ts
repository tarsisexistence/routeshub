import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import en from '@angular/common/locales/en';

import { en_US, NgZorroAntdModule, NZ_I18N } from 'ng-zorro-antd';

import { VehiclesResolver } from '../routing/vehicles.resolver';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContentComponent } from './components/content/content.component';
import { ViewComponent } from './containers/view/view.component';

registerLocaleData(en);

const components = [
  HeaderComponent,
  FooterComponent,
  ContentComponent,
  ViewComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    NgZorroAntdModule
  ],
  exports: components,
  declarations: components,
  providers: [VehiclesResolver, { provide: NZ_I18N, useValue: en_US }]
})
export class CoreModule {}
