import { ModuleWithProviders, NgModule } from '@angular/core';
import { ComponentLoaderFactory } from '../component-loader/component-loader.factory';
import { SelectizeComponent } from './selectize.component';
import {CommonModule} from '@angular/common';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SelectizeComponent
  ],
  exports: [
    SelectizeComponent
  ],
  entryComponents: [SelectizeComponent]
})
export class SelectizeModule {
  public static forRoot(config?: any): ModuleWithProviders<SelectizeModule> {
    return {
      ngModule: SelectizeModule,
      providers: [
        ComponentLoaderFactory
      ]
    };
  };
}
