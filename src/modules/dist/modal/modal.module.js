import { NgModule, ModuleWithProviders } from '@angular/core';
import { ModalService } from './modal.service';
import { ModalPlaceholderComponent } from './modal-placeholder.component';
import { ModalBackdropComponent } from './modal-backdrop.component';
var ModalModule = /** @class */ (function () {
    function ModalModule() {
    }
    ModalModule.forRoot = function () {
        return {
            ngModule: ModalModule,
            providers: [ModalService]
        };
    };
    ModalModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ModalPlaceholderComponent, ModalBackdropComponent],
                    exports: [ModalPlaceholderComponent],
                    entryComponents: [ModalBackdropComponent]
                },] },
    ];
    /** @nocollapse */
    ModalModule.ctorParameters = function () { return []; };
    return ModalModule;
}());
export { ModalModule };
//# sourceMappingURL=modal.module.js.map