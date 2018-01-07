import {Directive, HostListener, ComponentRef, ViewContainerRef, Input, ComponentFactoryResolver} from '@angular/core';
import {TooltipContentComponent} from './tooltip-content.component';
import {TooltipConfig} from './tooltip.config';

@Directive({
  selector: '[hxTooltip]'
})

export class TooltipDirective {

  private tooltip: ComponentRef<TooltipContentComponent>;
  private visible: boolean;

  constructor(private viewContainerRef: ViewContainerRef,
              private resolver: ComponentFactoryResolver,
              private config: TooltipConfig) {
    Object.assign(this, config);
  }

  @Input('hxTooltip') public content: string|TooltipContentComponent;

  @Input() public disabled: boolean;

  @Input() public animation = true;

  @Input() public placement: 'top'|'bottom'|'left'|'right' = 'bottom';

  @HostListener('focusin')
  @HostListener('mouseenter')
  show(): void {
    if (this.disabled || this.visible)
      return;

    this.visible = true;
    if (typeof this.content === 'string') {
      const factory = this.resolver.resolveComponentFactory(TooltipContentComponent);
      if (!this.visible)
        return;

      this.tooltip = this.viewContainerRef.createComponent(factory);
      this.tooltip.instance.hostElement = this.viewContainerRef.element.nativeElement;
      this.tooltip.instance.content = this.content as string;
      this.tooltip.instance.placement = this.placement;
      this.tooltip.instance.animation = this.animation;
    } else {
      const tooltip = this.content as TooltipContentComponent;
      tooltip.hostElement = this.viewContainerRef.element.nativeElement;
      tooltip.placement = this.placement;
      tooltip.animation = this.animation;
      tooltip.show();
    }
  }

  @HostListener('focusout')
  @HostListener('mouseleave')
  hide(): void {
    if (!this.visible)
      return;

    this.visible = false;
    if (this.tooltip)
      this.tooltip.destroy();

    if (this.content instanceof TooltipContentComponent)
      (this.content as TooltipContentComponent).hide();
  }

}
