import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppRoutingModule} from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HxUiModule} from '../../modules/index';
import { HighlightJsModule, HighlightJsService } from 'angular2-highlight-js';
import {Ng2PageScrollModule, PageScrollService} from 'ng2-page-scroll';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HxUiModule,
    HighlightJsModule,
    Ng2PageScrollModule
  ],
  declarations: [],
  exports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HxUiModule,
    HighlightJsModule,
    Ng2PageScrollModule
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
