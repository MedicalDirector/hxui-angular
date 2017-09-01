import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';


import {TooltipContentComponent} from "./tooltip-content.component";
import {TooltipDirective} from "./tooltip.directive";
import {TooltipConfig} from "./tooltip.config";

@NgModule({
  imports: [CommonModule],
  declarations: [TooltipContentComponent,TooltipDirective],
  exports: [TooltipContentComponent,TooltipDirective],
  entryComponents: [TooltipContentComponent]
})
export class TooltipModule {
  public static forRoot(): ModuleWithProviders {return {ngModule: TooltipModule, providers: [TooltipConfig]};}
}
