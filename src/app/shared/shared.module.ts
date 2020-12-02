import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {HighlightModule} from 'ngx-highlightjs';
import {HxUiModule} from '../../../projects/hx-ui/src/lib/hx-ui.module';
import {ToastrModule} from '../../../projects/hx-ui/src/lib/toastr/toastr.module';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { NgSelectModule } from '@ng-select/ng-select'
import {NgOptionHighlightModule} from "@ng-select/ng-option-highlight";


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
    NgxPageScrollCoreModule,
    HighlightModule,
    ToastrModule,
    NgSelectModule,
    NgOptionHighlightModule
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
    NgxPageScrollCoreModule,
    HighlightModule,
    ToastrModule,
    NgSelectModule,
    NgOptionHighlightModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
