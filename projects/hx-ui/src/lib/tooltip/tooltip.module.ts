import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TooltipContentComponent } from './tooltip-content.component';
import { TooltipDynamicContentDirective } from './tooltip-dynamic-content.directive';
import { TooltipConfig } from './tooltip.config';
import { TooltipDirective } from './tooltip.directive';

@NgModule({
  imports: [A11yModule, CommonModule, OverlayModule, PortalModule],
  declarations: [
    TooltipContentComponent,
    TooltipDirective,
    TooltipDynamicContentDirective
  ],
  exports: [
    TooltipContentComponent,
    TooltipDirective,
    TooltipDynamicContentDirective
  ]
})
export class TooltipModule {
  public static forRoot(): ModuleWithProviders<TooltipModule> {
    return { ngModule: TooltipModule, providers: [TooltipConfig] };
  }
}
