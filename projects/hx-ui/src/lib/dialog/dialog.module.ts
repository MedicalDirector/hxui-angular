import { ModuleWithProviders, NgModule } from '@angular/core';
import { DialogService } from './dialog.service';

@NgModule({})
export class DialogModule {
  public static forRoot(): ModuleWithProviders<DialogModule> {
    return {
      ngModule: DialogModule,
      providers: [DialogService]
    };
  }
}
