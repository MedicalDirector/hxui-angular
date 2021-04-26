import {NgModule} from "@angular/core";
import {HxaToastrComponent} from "./hxa-toastr.component";
import {ToastrModule} from "ngx-toastr";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [HxaToastrComponent],
  exports: [HxaToastrComponent],
  imports: [
    ToastrModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule
  ]
})
export class HxaToastrModule {
}
