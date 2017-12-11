import { OnInit, Injector } from '@angular/core';
import { ModalService } from './modal.service';
export declare class ModalPlaceholderComponent implements OnInit {
    private modalService;
    private injector;
    viewContainerRef: any;
    constructor(modalService: ModalService, injector: Injector);
    ngOnInit(): void;
}
