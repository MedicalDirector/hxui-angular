import {Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[hxaInputLabelStyle]'
  })
  export class LabelStylesDirective {

    constructor(private el: ElementRef,
        private renderer: Renderer2) {
            this.styleLabel();           
    }

    @HostListener("focus")
    onFocus() {
        this.styleLabelAsFloating();
    }

    @HostListener("blur")
    onBlur() {
        this.styleLabel();
    }

    styleLabel() {
        // If the element is empty, style the label like a placeholder otherwise float the label above the input
        if (this.el.nativeElement.value.trim().length === 0 && this.el.nativeElement.placeholder.trim().length === 0 )  {
            this.styleLabelAsPlaceholder();           
        } else {
            this.styleLabelAsFloating();        
        }
    }

    styleLabelAsPlaceholder() {
        this.renderer.addClass(this.el.nativeElement, 'has-label-placeholder');
        this.renderer.removeClass(this.el.nativeElement, 'has-label-floating');
    }

    styleLabelAsFloating() {
        this.renderer.addClass(this.el.nativeElement, 'has-label-floating');
        this.renderer.removeClass(this.el.nativeElement, 'has-label-placeholder'); 
    }
    
  }