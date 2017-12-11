import { Component, ViewChild, OnInit, ViewContainerRef, Injector } from '@angular/core';
import { ModalService } from './modal.service';
// this is the modal container
var ModalPlaceholderComponent = /** @class */ (function () {
    function ModalPlaceholderComponent(modalService, injector) {
        this.modalService = modalService;
        this.injector = injector;
    }
    ModalPlaceholderComponent.prototype.ngOnInit = function () {
        this.modalService.registerViewContainerRef(this.viewContainerRef);
        this.modalService.registerInjector(this.injector);
    };
    ModalPlaceholderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'hx-modal-placeholder',
                    template: "<div #modalPlaceholder></div>"
                },] },
    ];
    /** @nocollapse */
    ModalPlaceholderComponent.ctorParameters = function () { return [
        { type: ModalService, },
        { type: Injector, },
    ]; };
    ModalPlaceholderComponent.propDecorators = {
        "viewContainerRef": [{ type: ViewChild, args: ['modalPlaceholder', { read: ViewContainerRef },] },],
    };
    return ModalPlaceholderComponent;
}());
export { ModalPlaceholderComponent };
//# sourceMappingURL=modal-placeholder.component.js.map