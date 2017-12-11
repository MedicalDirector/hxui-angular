import { Component } from '@angular/core';
import { Modal } from './modal.annotation';
var ModalBackdropComponent = /** @class */ (function () {
    function ModalBackdropComponent() {
    }
    ModalBackdropComponent.prototype.dismiss = function () {
        this.close();
        this.destroy();
    };
    ModalBackdropComponent.decorators = [
        { type: Component, args: [{
                    selector: 'hx-modal-backdrop',
                    template: "<div class=\"hx-modal-backdrop fade in\" (click)=\"dismiss()\"></div>"
                },] },
    ];
    /** @nocollapse */
    ModalBackdropComponent.ctorParameters = function () { return []; };
    return ModalBackdropComponent;
}());
export { ModalBackdropComponent };
//# sourceMappingURL=modal-backdrop.component.js.map