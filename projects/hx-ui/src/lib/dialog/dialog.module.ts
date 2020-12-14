import { NgModule, ModuleWithProviders } from '@angular/core';
import {DialogService} from './dialog.service';
import {DialogOverlayRef} from "./dialog-overlay.ref";

@NgModule({})
export class DialogModule {
  public static forRoot(): ModuleWithProviders<DialogModule> {
    return {
      ngModule: DialogModule,
      providers: [
        DialogService,
        DialogOverlayRef
      ]
    };
  }
}

