import { ModuleWithProviders, NgModule } from '@angular/core';
import { AutoGrowDirective } from './auto-grow.directive';

@NgModule({
  declarations: [AutoGrowDirective],
  exports: [AutoGrowDirective],
})
export class AutoGrowModule {
  public static forRoot(): ModuleWithProviders<AutoGrowModule> {
    return {
      ngModule: AutoGrowModule,
      providers: [],
    };
  }
}
