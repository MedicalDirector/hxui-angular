
import {Component} from '@angular/core';
import {Modal} from './modal.annotation';

@Component({
    selector: 'hx-modal-backdrop',
    template: `<div class="hx-modal-backdrop fade in" (click)="dismiss()"></div>`
})
@Modal()
export class ModalBackdropComponent {
    protected destroy: Function;
    protected close: Function;

    dismiss(): void {
        this.close();
        this.destroy();
    }
}
