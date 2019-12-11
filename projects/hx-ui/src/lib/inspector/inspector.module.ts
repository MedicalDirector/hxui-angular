import {ModuleWithProviders, NgModule} from '@angular/core';
import {InspectorService} from './inspector.service';

@NgModule({})
export class InspectorModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: InspectorModule,
      providers: [InspectorService]
    };
  }
}
