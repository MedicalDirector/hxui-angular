import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { TooltipContentComponent } from './tooltip-content.component';
import { TooltipDirective } from './tooltip.directive';
import { TooltipConfig } from './tooltip.config';
var TooltipModule = /** @class */ (function () {
    function TooltipModule() {
    }
    TooltipModule.forRoot = function () { return { ngModule: TooltipModule, providers: [TooltipConfig] }; };
    TooltipModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [TooltipContentComponent, TooltipDirective],
                    exports: [TooltipContentComponent, TooltipDirective],
                    entryComponents: [TooltipContentComponent]
                },] },
    ];
    /** @nocollapse */
    TooltipModule.ctorParameters = function () { return []; };
    return TooltipModule;
}());
export { TooltipModule };
//# sourceMappingURL=tooltip.module.js.map