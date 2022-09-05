import { Component } from '@angular/core';
import { Modal } from '@hxui/angular';

@Modal()
@Component({
  selector: 'eg-custom-modal',
  template: `
    <div class="hx-modal is-active">
      <div class="hx-modal-background"></div>
      <div class="hx-modal-card">
        <header class="hx-modal-card-head">
          <h1 class="hx-modal-card-title">HxUI Modal Title</h1>
          <a class="hx-button is-round is-small is-white" (click)="onCancel()">
            <span class="hx-icon-control">
              <i class="icon icon-close-empty is-large"></i>
            </span>
          </a>
        </header>
        <section class="hx-modal-card-content">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus,
            nec rutrum justo nibh eu lectus. Ut vulputate semper dui. Fusce erat
            odio, sollicitudin vel erat vel, interdum mattis neque.
          </p>
        </section>
        <footer class="hx-modal-card-foot">
          <button class="hx-button is-primary" (click)="onOk()">
            Save changes
          </button>
          <button class="hx-button" (click)="onCancel()">Cancel</button>
        </footer>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class ExampleCustomModalComponent {
  protected onSuccess: (args: string) => void;
  protected close: () => void;

  onCancel() {
    this.close();
  }

  onOk() {
    this.onSuccess('Success!');
  }
}
