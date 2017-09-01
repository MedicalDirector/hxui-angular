import { Component, OnInit } from '@angular/core';
import {Modal} from '../../../../modules/modal/modal.annotation';

@Component({
  selector: 'app-custom-modal',
  template: `
    <div class="hx-modal is-active">
      <div class="hx-modal-background"></div>
      <div class="hx-modal-card">
        <header class="hx-modal-card-head">
          <h1 class="hx-modal-card-title">HxUI Modal Title</h1>
          <button class="delete" (click)="onCancel()"></button>
        </header>
        <section class="hx-modal-card-content">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.</p>
        </section>
        <footer class="hx-modal-card-foot">
          <a class="hx-button is-primary" (click)="onOk()">Save changes</a>
          <a class="hx-button" (click)="onCancel()">Cancel</a>
        </footer>
      </div>
    </div>
  `
})

@Modal()
export class CustomModalComponent implements OnInit {

  protected onSuccess: Function;
  protected onCancelled: Function;
  protected close: Function;

  constructor() { }

  ngOnInit() {
  }

  onCancel = () => {
    this.onCancelled('Cancelled!');
    this.close();
  }

  onOk = () => {
    this.onSuccess('Success!');
    this.close();
  }

}
