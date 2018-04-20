import { ModuleWithProviders, NgModule } from '@angular/core';
import { ComponentLoaderFactory } from '../component-loader/component-loader.factory';

import { PositioningService } from '../positioning/positioning.service';
import { SelectizeComponent } from '../selectize/selectize.component';
import { SelectizeConfig } from '../selectize/selectize.config';

@NgModule({
  declarations: [
    SelectizeComponent
  ],
  exports: [
    SelectizeComponent
  ],
  entryComponents: [SelectizeComponent]
})
export class SelectizeModule {
  public static forRoot(config?: any): ModuleWithProviders {
    return {
      ngModule: SelectizeModule,
      providers: [
        ComponentLoaderFactory
      ]
    };
  };
}
