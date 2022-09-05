import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HxaToastrComponent } from '@hxui/angular';
import { HighlightOptions, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { ToastrModule } from 'ngx-toastr';
import { APP_ROUTES } from './app.routes';

const modules = [BrowserModule, BrowserAnimationsModule, HttpClientModule];

@NgModule({
  declarations: [],
  imports: [
    ...modules,
    RouterModule.forRoot(APP_ROUTES, {
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
      useHash: true, // TODO: switch to Angular Scully or Angular Universal to prerender pages and turn off hash routing
    }),
    ToastrModule.forRoot({
      toastComponent: HxaToastrComponent,
      toastClass: 'hxa-toastr',
      iconClasses: {
        error: 'is-danger',
        info: 'is-info',
        success: 'is-success',
        warning: 'is-warning',
      },
    }),
  ],
  exports: [...modules, RouterModule, ToastrModule],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: HIGHLIGHT_OPTIONS,
          useValue: <HighlightOptions>(<unknown>{
            coreLibraryLoader: () => import('highlight.js/lib/core'),
            lineNumbersLoader: () => import('highlightjs-line-numbers.js'),
            languages: {
              typescript: () => import('highlight.js/lib/languages/typescript'),
              scss: () => import('highlight.js/lib/languages/scss'),
              xml: () => import('highlight.js/lib/languages/xml'),
              bash: () => import('highlight.js/lib/languages/bash'),
            },
          }),
        },
      ],
    };
  }
}
