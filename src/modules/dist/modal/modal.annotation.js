// These 2 items will make sure that you can annotate
// a custom modal component with @Modal()
var 
// These 2 items will make sure that you can annotate
// a custom modal component with @Modal()
ModalContainer = /** @class */ (function () {
    function ModalContainer() {
    }
    ModalContainer.prototype.close = function () {
        this.destroy();
    };
    return ModalContainer;
}());
// These 2 items will make sure that you can annotate
// a custom modal component with @Modal()
export { ModalContainer };
export function Modal() {
    return function (target) {
        Object.assign(target.prototype, ModalContainer.prototype);
    };
}
//# sourceMappingURL=modal.annotation.js.map