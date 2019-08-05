import { NgModule, ModuleWithProviders } from '@angular/core';
import {DialogService} from './dialog.service';

@NgModule({})
export class DialogModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: DialogModule,
      providers: [DialogService]
    };
  }
}

