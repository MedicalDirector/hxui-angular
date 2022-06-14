import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { InspectorComponent } from './inspector.component';
import { InspectorService } from './inspector.service';

@NgModule({
  imports: [PortalModule, CommonModule],
  declarations: [InspectorComponent],
})
export class InspectorModule {
  public static forRoot(): ModuleWithProviders<InspectorModule> {
    return {
      ngModule: InspectorModule,
      providers: [InspectorService],
    };
  }
}
