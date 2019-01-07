import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { routing } from './routing/routes';

@NgModule({
  imports: [BrowserModule, CoreModule, SharedModule, routing],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
