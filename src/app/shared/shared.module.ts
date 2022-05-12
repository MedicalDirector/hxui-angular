import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  HighlightModule,
  HighlightOptions,
  HIGHLIGHT_OPTIONS
} from 'ngx-highlightjs';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { HxUiModule } from '../../../projects/hx-ui/src/lib/hx-ui.module';
import { AppRoutingModule } from '../app-routing.module';

const modules = [
  BrowserModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  CommonModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  HxUiModule,
  // TODO: replace this scroll with https://github.com/MurhafSousli/ngx-scrollbar
  NgxPageScrollCoreModule,
  HighlightModule,
  NgSelectModule,
  NgOptionHighlightModule
];

@NgModule({
  imports: modules,
  declarations: [],
  exports: modules
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        {
          provide: HIGHLIGHT_OPTIONS,
          useValue: <HighlightOptions>{
            coreLibraryLoader: () => import('highlight.js/lib/core'),
            lineNumbersLoader: () => import('highlightjs-line-numbers.js'),
            languages: {
              typescript: () => import('highlight.js/lib/languages/typescript'),
              css: () => import('highlight.js/lib/languages/css'),
              xml: () => import('highlight.js/lib/languages/xml')
            }
          }
        }
      ]
    };
  }
}
