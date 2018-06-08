// These 2 items will make sure that you can annotate
// a custom modal component with @Modal()
export class ModalContainer {
    protected destroy: Function;
    protected close(): void {
        this.destroy();
    }
}
export function Modal() {
    return function (target: any) {
        Object.assign(target.prototype,  ModalContainer.prototype);
    };
}