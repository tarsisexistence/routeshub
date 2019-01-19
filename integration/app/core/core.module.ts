import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import en from '@angular/common/locales/en';

import { en_US, NgZorroAntdModule, NZ_I18N } from 'ng-zorro-antd';

import { RoutingModule } from '../routing/routing.module';
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
    NgZorroAntdModule,
    RoutingModule
  ],
  declarations: components,
  exports: [RoutingModule, ...components],
  providers: [{ provide: NZ_I18N, useValue: en_US }]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    core: CoreModule
  ) {
    if (core) {
      throw new Error(`Core module must not be imported twice!`);
    }
  }
}
