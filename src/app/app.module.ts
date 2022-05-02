
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en-AU';
import {HxUiModule} from '../../projects/hx-ui/src/lib/hx-ui.module';

registerLocaleData(localeEn, 'en-AU');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule.forRoot(),
    SharedModule.forRoot(),
    HxUiModule.forRoot(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

