import { ModuleWithProviders, NgModule } from '@angular/core';
import { ComponentLoaderFactory } from '../component-loader/component-loader.factory';
import { SelectizeComponent } from './selectize.component';


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
