import { Injectable } from '@angular/core';
/** Default values provider for tooltip */
var TooltipConfig = /** @class */ (function () {
    function TooltipConfig() {
        /** tooltip placement, supported positions: 'top', 'bottom', 'left', 'right' */
        this.placement = 'bottom';
        /** should tooltip start in a disabled state */
        this.disabled = false;
        /** animate tooltip or not */
        this.animation = true;
    }
    TooltipConfig.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    TooltipConfig.ctorParameters = function () { return []; };
    return TooltipConfig;
}());
export { TooltipConfig };
//# sourceMappingURL=tooltip.config.js.map