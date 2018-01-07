import { Directive, HostListener, ComponentRef, ViewContainerRef, Input, ComponentFactoryResolver } from '@angular/core';
import { TooltipContentComponent } from './tooltip-content.component';
import { TooltipConfig } from './tooltip.config';
var TooltipDirective = /** @class */ (function () {
    function TooltipDirective(viewContainerRef, resolver, config) {
        this.viewContainerRef = viewContainerRef;
        this.resolver = resolver;
        this.config = config;
        this.animation = true;
        this.placement = 'bottom';
        Object.assign(this, config);
    }
    TooltipDirective.prototype.show = function () {
        if (this.disabled || this.visible)
            return;
        this.visible = true;
        if (typeof this.content === 'string') {
            var factory = this.resolver.resolveComponentFactory(TooltipContentComponent);
            if (!this.visible)
                return;
            this.tooltip = this.viewContainerRef.createComponent(factory);
            this.tooltip.instance.hostElement = this.viewContainerRef.element.nativeElement;
            this.tooltip.instance.content = this.content;
            this.tooltip.instance.placement = this.placement;
            this.tooltip.instance.animation = this.animation;
        }
        else {
            var tooltip = this.content;
            tooltip.hostElement = this.viewContainerRef.element.nativeElement;
            tooltip.placement = this.placement;
            tooltip.animation = this.animation;
            tooltip.show();
        }
    };
    TooltipDirective.prototype.hide = function () {
        if (!this.visible)
            return;
        this.visible = false;
        if (this.tooltip)
            this.tooltip.destroy();
        if (this.content instanceof TooltipContentComponent)
            this.content.hide();
    };
    TooltipDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[hxTooltip]'
                },] },
    ];
    /** @nocollapse */
    TooltipDirective.ctorParameters = function () { return [
        { type: ViewContainerRef, },
        { type: ComponentFactoryResolver, },
        { type: TooltipConfig, },
    ]; };
    TooltipDirective.propDecorators = {
        "content": [{ type: Input, args: ['hxTooltip',] },],
        "disabled": [{ type: Input },],
        "animation": [{ type: Input },],
        "placement": [{ type: Input },],
        "show": [{ type: HostListener, args: ['focusin',] }, { type: HostListener, args: ['mouseenter',] },],
        "hide": [{ type: HostListener, args: ['focusout',] }, { type: HostListener, args: ['mouseleave',] },],
    };
    return TooltipDirective;
}());
export { TooltipDirective };
//# sourceMappingURL=tooltip.directive.js.map