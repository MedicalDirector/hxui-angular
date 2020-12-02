import { ModuleWithProviders, NgModule } from '@angular/core';
import {EmptyStateComponent} from './empty-state.component';
import {CommonModule} from '@angular/common';
import {EmptyStateConfig} from './empty-state.config';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    EmptyStateComponent
  ],
  exports: [
    EmptyStateComponent
  ]
})
export class EmptyStateModule {
  public static forRoot(): ModuleWithProviders<EmptyStateModule> {
    return {
      ngModule: EmptyStateModule,
      providers: [EmptyStateConfig]
    };
  };
}
