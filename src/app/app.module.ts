
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en-AU';
import {HIGHLIGHT_OPTIONS, HighlightModule, HighlightOptions} from 'ngx-highlightjs';
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
    HighlightModule
  ],
  providers: [{
    provide: HIGHLIGHT_OPTIONS,
    useValue: <HighlightOptions>{
      lineNumbers: true,
      // The following is just a workaround to activate the line numbers script since dynamic import does not work in Stackblitz
      lineNumbersLoader: () => null
    }
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

