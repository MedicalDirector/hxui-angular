import { Directive, EventEmitter, HostBinding, Input, Output, TemplateRef, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { TabsetComponent } from './tabset.component';
var TabDirective = /** @class */ (function () {
    function TabDirective(tabset, elementRef) {
        this.elementRef = elementRef;
        /** fired when tab became active, $event:Tab equals to selected instance of Tab component */
        this.select = new EventEmitter();
        /** fired when tab became inactive, $event:Tab equals to deselected instance of Tab component */
        this.deselect = new EventEmitter();
        /** fired before tab will be removed, $event:Tab equals to instance of removed tab */
        this.removed = new EventEmitter();
        this.addClasn = true;
        this.tabset = tabset;
        this.tabset.addTab(this);
    }
    Object.defineProperty(TabDirective.prototype, "active", {
        get: /** tab active state toggle */
        function () {
            return this._active;
        },
        set: function (active) {
            var _this = this;
            if (this.disabled && active || !active) {
                if (!active) {
                    this._active = active;
                }
                //if(typeof active != 'undefined')
                this.deselect.emit(this);
                return;
            }
            this._active = active;
            this.select.emit(this);
            this.tabset.tabs.forEach(function (tab) {
                if (tab !== _this) {
                    tab.active = false;
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    TabDirective.prototype.ngOnInit = function () {
        this.removable = this.removable;
    };
    TabDirective.prototype.ngOnDestroy = function () {
        this.tabset.removeTab(this, { reselect: false, emit: false });
    };
    TabDirective.decorators = [
        { type: Directive, args: [{ selector: 'hx-tab, [hx-tab]' },] },
    ];
    /** @nocollapse */
    TabDirective.ctorParameters = function () { return [
        { type: TabsetComponent, },
        { type: ElementRef, },
    ]; };
    TabDirective.propDecorators = {
        "heading": [{ type: Input },],
        "id": [{ type: Input },],
        "disabled": [{ type: Input },],
        "removable": [{ type: Input },],
        "customClass": [{ type: Input },],
        "active": [{ type: HostBinding, args: ['class.is-active',] }, { type: Input },],
        "select": [{ type: Output },],
        "deselect": [{ type: Output },],
        "removed": [{ type: Output },],
        "addClasn": [{ type: HostBinding, args: ['class.hx-tab-pane',] },],
    };
    return TabDirective;
}());
export { TabDirective };
//# sourceMappingURL=tab.directive.js.map