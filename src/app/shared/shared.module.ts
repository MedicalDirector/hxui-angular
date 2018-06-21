import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxPageScrollModule, PageScrollService} from 'ngx-page-scroll';
import {HttpClientModule} from '@angular/common/http';
import {HighlightModule} from 'ngx-highlightjs';
import {HxUiModule} from '../../../projects/hx-ui/src/lib/hx-ui.module';


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
    NgxPageScrollModule,
    HighlightModule
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
    NgxPageScrollModule,
    HighlightModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        PageScrollService
      ]
    };
  }
}
