export class ModalsCode {

  usage =
    `
    import {ModalModule} from "@hxui/angular";

    @NgModule({
      imports: [ModalModule.forRoot(),...]
    })
    export class AppModule(){}
    `;

  placeholder =
    `
     <!--Add this placeholder component anywhere on the body.-->
     <hx-modal-placeholder></hx-modal-placeholder>
    `;

  exampleTemplate =
    `
    <button class="hx-button is-primary is-outlined"  type="button" (click)="openModal()">
      Open Modal
    </button>
    `;

  exampleTypescript =
    `
    import { Component, OnInit } from '@angular/core';
    import {ModalService} from "@hxui/angular";
    import {CustomModalComponent} from "./custom-modal/custom-modal.component";

    @Component({
      selector: 'app-modals',
      templateUrl: './modals.component.html'
    })
    export class ModalsComponent implements OnInit {

      constructor(private modalService: ModalService) {

      ngOnInit() {
      }

      openModal = () => {
        this.modalService.create<CustomModalComponent>(CustomModalComponent, {
          onSuccess: (data) => {
           alert(data);
          }
        });
      }

    }
    `;

  exampleModal =
    `
    import { Component, OnInit } from '@angular/core';
    import { Modal} from '@hxui/angular';

    @Component({
      selector: 'app-custom-modal',
      template: \`
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
      \`
    })

    @Modal()
    export class CustomModalComponent implements OnInit {

      protected onSuccess: Function;
      protected close: Function;

      constructor() {

      ngOnInit() {
      }

      onCancel = () => {
        this.close();
      }

      onOk = () => {
        this.onSuccess('Callback');
        this.close();
      }

    }
    `;

  exampleModule =
    `
    @NgModule({
      ...
      declarations: [CustomModalComponent]
    })
    `;
}
