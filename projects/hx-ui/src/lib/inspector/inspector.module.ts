import {ModuleWithProviders, NgModule} from '@angular/core';
import {InspectorService} from './inspector.service';
import {InspectorComponent} from './inspector.component';
import {PortalModule} from '@angular/cdk/portal';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  imports: [
    PortalModule,
    BrowserAnimationsModule,
    BrowserModule
  ],
  declarations: [InspectorComponent]
})
export class InspectorModule {
  public static forRoot(): ModuleWithProviders<InspectorModule> {
    return {
      ngModule: InspectorModule,
      providers: [InspectorService]
    };
  }
}
