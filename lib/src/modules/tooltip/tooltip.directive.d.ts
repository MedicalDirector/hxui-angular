import { ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { TooltipContentComponent } from './tooltip-content.component';
import { TooltipConfig } from './tooltip.config';
export declare class TooltipDirective {
    private viewContainerRef;
    private resolver;
    private config;
    private tooltip;
    private visible;
    constructor(viewContainerRef: ViewContainerRef, resolver: ComponentFactoryResolver, config: TooltipConfig);
    content: string | TooltipContentComponent;
    disabled: boolean;
    animation: boolean;
    placement: 'top' | 'bottom' | 'left' | 'right';
    show(): void;
    hide(): void;
}
