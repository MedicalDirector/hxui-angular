import {Component, ViewChild, OnInit, ViewContainerRef, Injector } from '@angular/core';
import {ModalService} from './modal.service';

// this is the modal container
@Component({
    selector: 'hx-modal-placeholder',
    template: `<div #modalPlaceholder></div>`
})
export class ModalPlaceholderComponent implements OnInit {
    @ViewChild('modalPlaceholder', {read: ViewContainerRef, static: true}) viewContainerRef;

    constructor(private modalService: ModalService, private injector: Injector) {
    }

    ngOnInit(): void {
        this.modalService.registerViewContainerRef(this.viewContainerRef);
        this.modalService.registerInjector(this.injector);
    }
}
