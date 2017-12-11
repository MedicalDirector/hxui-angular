import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { DropdownState } from './dropdown.state';
var DropdownContainerComponent = /** @class */ (function () {
    function DropdownContainerComponent(_state) {
        var _this = this;
        this._state = _state;
        this.isOpen = false;
        this._subscription = _state.isOpenChange.subscribe(function (value) {
            _this.isOpen = value;
        });
    }
    Object.defineProperty(DropdownContainerComponent.prototype, "direction", {
        get: function () {
            return this._state.direction;
        },
        enumerable: true,
        configurable: true
    });
    DropdownContainerComponent.prototype.ngOnDestroy = function () {
        this._subscription.unsubscribe();
    };
    DropdownContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'hx-dropdown-container',
                    host: {
                        style: 'display:block;position: absolute;'
                    },
                    template: "\n    <div [class.is-dropup]=\"direction === 'up'\"\n         [class.is-dropdown]=\"direction === 'down'\"\n         [class.is-open]=\"isOpen\"><ng-content></ng-content></div>\n  "
                },] },
    ];
    /** @nocollapse */
    DropdownContainerComponent.ctorParameters = function () { return [
        { type: DropdownState, },
    ]; };
    return DropdownContainerComponent;
}());
export { DropdownContainerComponent };
//# sourceMappingURL=dropdown-container.component.js.map