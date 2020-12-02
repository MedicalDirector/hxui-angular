import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import {OverlayModule} from '@angular/cdk/overlay';
import {A11yModule} from '@angular/cdk/a11y';
import {TooltipContentComponent} from './tooltip-content.component';
import {TooltipDirective} from './tooltip.directive';
import {TooltipConfig} from './tooltip.config';
import {PortalModule} from '@angular/cdk/portal';
import {TooltipDynamicContentDirective} from './tooltip-dynamic-content.directive';

@NgModule({
  imports: [
    A11yModule,
    CommonModule,
    OverlayModule,
    PortalModule
  ],
  declarations: [TooltipContentComponent, TooltipDirective, TooltipDynamicContentDirective],
  exports: [TooltipContentComponent, TooltipDirective, TooltipDynamicContentDirective]
})
export class TooltipModule {
  public static forRoot(): ModuleWithProviders<TooltipModule> {return {ngModule: TooltipModule, providers: [TooltipConfig]}; }
}
