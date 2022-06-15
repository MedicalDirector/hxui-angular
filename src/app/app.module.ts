import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en-AU';
import { NgModule } from '@angular/core';
import { HxUiModule } from '../../projects/hx-ui/src/lib/hx-ui.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

registerLocaleData(localeEn, 'en-AU');

@NgModule({
  imports: [CoreModule.forRoot(), SharedModule.forRoot(), HxUiModule.forRoot()],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
