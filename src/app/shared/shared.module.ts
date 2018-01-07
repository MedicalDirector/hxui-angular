import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HxUiModule} from 'modules/index';
import { HighlightJsModule, HighlightJsService } from 'angular2-highlight-js';
import {NgxPageScrollModule, PageScrollService} from 'ngx-page-scroll';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HxUiModule,
    HighlightJsModule,
    NgxPageScrollModule
  ],
  declarations: [],
  exports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HxUiModule,
    HighlightJsModule,
    NgxPageScrollModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        HighlightJsService,
        PageScrollService
      ]
    };
  }
}
