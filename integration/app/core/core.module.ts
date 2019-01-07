import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import en from '@angular/common/locales/en';

import { en_US, NgZorroAntdModule, NZ_I18N } from 'ng-zorro-antd';

import { routing } from './routing/routes';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContentComponent } from './containers/content/content.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';

registerLocaleData(en);

const components = [
  HeaderComponent,
  FooterComponent,
  ContentComponent,
  BreadcrumbsComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    routing,
    NgZorroAntdModule
  ],
  exports: components,
  declarations: components,
  providers: [{ provide: NZ_I18N, useValue: en_US }]
})
export class CoreModule {}
