import {Component, ViewChild, OnInit, ViewContainerRef, Injector, HostListener} from '@angular/core';
import {ModalService} from './modal.service';

// this is the modal container
@Component({
    selector: 'hx-modal-placeholder',
    template: `<div #modalPlaceholder></div>`
})
export class ModalPlaceholderComponent implements OnInit {
    @ViewChild('modalPlaceholder', {read: ViewContainerRef}) viewContainerRef;

    @HostListener('window:keyup.esc')
    onEscape = () => {
      this.modalService.close();
    }

    constructor(private modalService: ModalService, private injector: Injector) {
    }

    ngOnInit(): void {
        this.modalService.registerViewContainerRef(this.viewContainerRef);
        this.modalService.registerInjector(this.injector);
    }
}
