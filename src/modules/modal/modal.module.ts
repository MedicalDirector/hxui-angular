import { NgModule, ModuleWithProviders } from '@angular/core';
import {ModalService} from "./modal.service";
import {ModalPlaceholderComponent} from "./modal-placeholder.component";
import {ModalBackdropComponent} from "./modal-backdrop.component";

@NgModule({
    declarations: [ModalPlaceholderComponent, ModalBackdropComponent],
    exports: [ModalPlaceholderComponent],
    entryComponents:[ModalBackdropComponent]
})
export class ModalModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: ModalModule,
            providers: [ModalService]
        };
    }
}

