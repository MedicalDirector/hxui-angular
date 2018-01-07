import { Directive, ElementRef, HostBinding, HostListener, OnDestroy, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DropdownState } from './dropdown.state';
var DropdownToggleDirective = /** @class */ (function () {
    function DropdownToggleDirective(_state, _element, _renderer) {
        var _this = this;
        this._state = _state;
        this._element = _element;
        this._renderer = _renderer;
        this._subscriptions = [];
        // sync is open value with state
        this._subscriptions.push(this._state
            .isOpenChange.subscribe(function (value) { return _this.isOpen = value; }));
        // populate disabled state
        this._subscriptions.push(this._state
            .isDisabledChange
            .subscribe(function (value) { return _this.isDisabled = value || false; }));
    }
    DropdownToggleDirective.prototype.onClick = function (event) {
        var _this = this;
        event.stopPropagation();
        if (this.isDisabled) {
            return;
        }
        // console.log(this._state.isOpen);
        if (!this._state.isOpen) {
            // console.log('click to open');
            this._state.toggleClick.emit();
        }
        if (this._state.isOpen || this._element.nativeElement.contains(event.target)) {
            var removeRegisteredListener_1 = this._renderer.listen('document', 'click', function () {
                //  console.log('the document was clicked', this._state.isOpen);
                //  console.log('the document was clicked', this._state.isOpen);
                _this._state.toggleClick.emit(false);
                removeRegisteredListener_1();
            });
        }
    };
    // Performance issue with multiple document listeners
    /*@HostListener('document:click', ['$event'])
      onDocumentClick(event: any): void {
        if (this._state.autoClose && event.button !== 2 &&
          !this._element.nativeElement.contains(event.target)) {
          console.log('document:click');
          this._state.toggleClick.emit(false);
        }
      }*/
    DropdownToggleDirective.prototype.onEsc = 
    // Performance issue with multiple document listeners
    /*@HostListener('document:click', ['$event'])
      onDocumentClick(event: any): void {
        if (this._state.autoClose && event.button !== 2 &&
          !this._element.nativeElement.contains(event.target)) {
          console.log('document:click');
          this._state.toggleClick.emit(false);
        }
      }*/
    function () {
        if (this._state.autoClose) {
            this._state.toggleClick.emit(false);
        }
    };
    DropdownToggleDirective.prototype.ngOnDestroy = function () {
        for (var _i = 0, _a = this._subscriptions; _i < _a.length; _i++) {
            var sub = _a[_i];
            sub.unsubscribe();
        }
    };
    DropdownToggleDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[hxDropdownToggle],[dropdownToggle]',
                    exportAs: 'hx-dropdown-toggle'
                },] },
    ];
    /** @nocollapse */
    DropdownToggleDirective.ctorParameters = function () { return [
        { type: DropdownState, },
        { type: ElementRef, },
        { type: Renderer2, },
    ]; };
    DropdownToggleDirective.propDecorators = {
        "isDisabled": [{ type: HostBinding, args: ['attr.disabled',] },],
        "isOpen": [{ type: HostBinding, args: ['class.is-active',] }, { type: HostBinding, args: ['attr.aria-expanded',] },],
        "onClick": [{ type: HostListener, args: ['click', ['$event'],] },],
        "onEsc": [{ type: HostListener, args: ['keyup.esc',] },],
    };
    return DropdownToggleDirective;
}());
export { DropdownToggleDirective };
//# sourceMappingURL=dropdown-toggle.directive.js.map