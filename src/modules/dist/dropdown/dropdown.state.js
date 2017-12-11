import { EventEmitter, Injectable } from '@angular/core';
import { HxComponentRef } from '../component-loader/hx-component-ref.class';
var DropdownState = /** @class */ (function () {
    function DropdownState() {
        var _this = this;
        this.direction = 'down';
        this.isOpenChange = new EventEmitter();
        this.isDisabledChange = new EventEmitter();
        this.toggleClick = new EventEmitter();
        this.dropdownMenu = new Promise(function (resolve) {
            _this.resolveDropdownMenu = resolve;
        });
        this.isOpenChange.subscribe(function (value) {
            _this.isOpen = value;
        });
    }
    DropdownState.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DropdownState.ctorParameters = function () { return []; };
    return DropdownState;
}());
export { DropdownState };
//# sourceMappingURL=dropdown.state.js.map