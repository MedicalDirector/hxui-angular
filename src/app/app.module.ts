
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en-AU';
import {HighlightModule} from 'ngx-highlightjs';
import {HxUiModule} from '../../projects/hx-ui/src/lib/hx-ui.module';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import {ToastrModule} from "ngx-toastr";
import {HxaToastrComponent} from "../../projects/hx-ui/src/lib/toastr/hxa-toastr.component";

registerLocaleData(localeEn, 'en-AU');

export function hljsLanguages() {
  return [
    {name: 'typescript', func: typescript},
    {name: 'scss', func: scss},
    {name: 'html', func: html}
  ];
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule.forRoot(),
    SharedModule.forRoot(),
    HxUiModule.forRoot(),
    HighlightModule.forRoot({languages: hljsLanguages })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

