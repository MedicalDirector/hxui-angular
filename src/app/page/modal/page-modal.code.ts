import { Code } from 'src/app/shared/page-base/page-base.model';

export class PageModalCode {
  usage: Code = {
    lang: ['ts'],
    text: `import { ModalModule } from "@hxui/angular";

@NgModule({
  imports: [
    ModalModule.forRoot(),
    ...
  ]
})
export class AppModule {}
`,
  };

  placeholder: Code = {
    lang: ['xml'],
    text: `<!--Add this placeholder component anywhere on the body.-->
<hx-modal-placeholder></hx-modal-placeholder>
`,
  };

  egBasicHTML: Code = {
    lang: ['xml'],
    text: `<button
  class="hx-button is-primary is-outlined"
  type="button"
  (click)="openModal()"
>
  Open Modal
</button>
`,
  };

  egBasicTS: Code = {
    lang: ['ts'],
    text: `import { Component } from '@angular/core';
import { ModalService } from '@hxui/angular';
import { ExampleCustomModalComponent } from './example/custom-modal.component';

@Component({
  selector: 'app-myfeature',
  templateUrl: './myfeature.component.html'
})
export class MyFeatureComponent {

  constructor(private _modalService: ModalService) {}

  openModal = () => {
    this._modalService.create<ExampleCustomModalComponent>(
      ExampleCustomModalComponent,
      {
        onSuccess: data => alert(data),
        close: () => this._modalService.close(),
      }
    );
  };
}
`,
  };

  egBasicChild: Code = {
    lang: ['ts'],
    text: `import { Component } from '@angular/core';
import { Modal } from '@hxui/angular';

@Modal()
@Component({
  selector: 'eg-custom-modal',
  template: \`
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
  \`
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
`,
  };

  egBasicNG: Code = {
    lang: ['ts'],
    text: `@NgModule({
  ...
  declarations: [CustomModalComponent]
})
`,
  };
}
