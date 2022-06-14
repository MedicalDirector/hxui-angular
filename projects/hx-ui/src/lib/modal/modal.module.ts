import { ModuleWithProviders, NgModule } from '@angular/core';
import { ModalBackdropComponent } from './modal-backdrop.component';
import { ModalPlaceholderComponent } from './modal-placeholder.component';
import { ModalService } from './modal.service';

@NgModule({
  declarations: [ModalPlaceholderComponent, ModalBackdropComponent],
  exports: [ModalPlaceholderComponent],
})
export class ModalModule {
  public static forRoot(): ModuleWithProviders<ModalModule> {
    return {
      ngModule: ModalModule,
      providers: [ModalService],
    };
  }
}
