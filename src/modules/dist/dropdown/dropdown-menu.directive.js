import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { DropdownState } from './dropdown.state';
var DropdownMenuDirective = /** @class */ (function () {
    function DropdownMenuDirective(_state, _viewContainer, _templateRef) {
        _state.resolveDropdownMenu({
            templateRef: _templateRef,
            viewContainer: _viewContainer
        });
    }
    DropdownMenuDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[hxDropdownMenu],[dropdownMenu]',
                    exportAs: 'hx-dropdown-menu'
                },] },
    ];
    /** @nocollapse */
    DropdownMenuDirective.ctorParameters = function () { return [
        { type: DropdownState, },
        { type: ViewContainerRef, },
        { type: TemplateRef, },
    ]; };
    return DropdownMenuDirective;
}());
export { DropdownMenuDirective };
//# sourceMappingURL=dropdown-menu.directive.js.map