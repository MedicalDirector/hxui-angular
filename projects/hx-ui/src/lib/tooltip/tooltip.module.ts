import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import {OverlayModule} from '@angular/cdk/overlay';
import {A11yModule} from '@angular/cdk/a11y';
import {TooltipContentComponent} from './tooltip-content.component';
import {TooltipDirective} from './tooltip.directive';
import {TooltipConfig} from './tooltip.config';
import {PortalModule} from '@angular/cdk/portal';

@NgModule({
  imports: [
    A11yModule,
    CommonModule,
    OverlayModule,
    PortalModule
  ],
  declarations: [TooltipContentComponent, TooltipDirective],
  exports: [TooltipContentComponent, TooltipDirective],
  entryComponents: [TooltipContentComponent]
})
export class TooltipModule {
  public static forRoot(): ModuleWithProviders {return {ngModule: TooltipModule, providers: [TooltipConfig]}; }
}
