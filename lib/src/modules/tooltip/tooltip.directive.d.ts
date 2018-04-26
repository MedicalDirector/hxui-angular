import { ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { TooltipContentComponent } from './tooltip-content.component';
import { TooltipConfig } from './tooltip.config';
import { Context } from '../enums';
export declare class TooltipDirective {
    private viewContainerRef;
    private resolver;
    private config;
    private tooltip;
    private visible;
    content: string | TooltipContentComponent;
    disabled: boolean;
    animation: boolean;
    placement: 'top' | 'bottom' | 'left' | 'right';
    context: Context;
    show(): void;
    hide(): void;
    constructor(viewContainerRef: ViewContainerRef, resolver: ComponentFactoryResolver, config: TooltipConfig);
}
