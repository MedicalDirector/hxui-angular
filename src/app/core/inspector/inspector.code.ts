export class InspectorCode {

  usage =
    `
    import {InspectorModule} from "@hxui/angular";

    @NgModule({
      imports: [InspectorModule.forRoot(),...]
    })
    export class AppModule(){}
    `;


  exampleTemplate =
    `
      <button class="hx-button is-primary is-outlined" type="button" (click)="openInspector()">
          Open Inspector
        </button>
    `;

  exampleTypescript =
    `
    import { Component, OnInit } from '@angular/core';
    import {InspectorService} from "@hxui/angular";
    import {CustomInspectorComponent} from "./custom-inspector/custom-inspector.component";

    @Component({
      selector: 'app-inspector',
      templateUrl: './inspector.component.html'
    })
    export class InspectorComponent implements OnInit {

      constructor(private inspectorService: InspectorService) {

      ngOnInit() {
      }

      openInspector = () => {
          const inspector: InspectorOverlayRef = this.inspectorService.open(BasicCustomInspectorComponent, { }, {
            visitId: 10,
            onClose: (data) => {
              console.log(data);
            },
            onResize: (data) => {
              console.log(data);
            }
          });
        }

    }
    `;

  exampleInspector =
    `
    import {AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
    import {InspectorOverlayRef} from '@hxui/angular';
    import {InspectorSize} from '@hxui/angular';
    import {Subscription} from 'rxjs/index';
    import {InspectorService} from '@hxui/angular';

    @Component({
      selector: 'app-basic-custom-inspector',
      template: \`
        <div class="hx-toolbar">
          <span>Heading</span>
          <div class="hx-spacer"></div>
        </div>
        <div class="hx-toolbar">
          <span>Resize</span>
          <div class="hx-spacer"></div>
          <button class="hx-button is-flat" (click)="small()">Small</button>
          <button class="hx-button is-flat" (click)="large()">Large</button>
          <button class="hx-button is-flat" (click)="openInspector(sizeEnum.Small)">Open Another (SM)</button>
          <button class="hx-button is-flat" (click)="openInspector(sizeEnum.Large)">Open Another (LG)</button>
        </div>
      \`,
      styles:[':host{ width:100% }']
    })

    export class BasicCustomInspectorComponent implements OnInit, AfterViewInit, OnDestroy {

      protected onClose: Function;
      protected onResize: Function;
      protected visitId = 0;
      sizeEnum = InspectorSize;

      private subscriptions: Subscription = new Subscription();

      constructor(public inspectorRef: InspectorOverlayRef,
                  private inspectorService: InspectorService) { }

      ngOnInit() {
        console.log(this.visitId);
        this.subscriptions.add(this.inspectorRef.inspectorInstance.onSlideInComplete$.subscribe((_) => this.onSlideInComplete(_)));
        this.subscriptions.add(this.inspectorRef.inspectorInstance.onSlideOutComplete$.subscribe((_) => this.onSlideOutComplete(_)));
        this.subscriptions.add(this.inspectorRef.inspectorInstance.onResizeComplete$.subscribe((_) => this.onResizeComplete(_)));
      }

      ngOnDestroy() {
        this.subscriptions.unsubscribe();
      }

      ngAfterViewInit() {

      }

      close() {
        this.onClose('Closing');
        this.inspectorRef.close();
      }

      small() {
        this.onResize('Resizing!');
        this.inspectorRef.resize(InspectorSize.Small);
      }


      large() {
        this.onResize('Resizing!');
        this.inspectorRef.resize(InspectorSize.Large);
      }

      openInspector = (size: InspectorSize) => {
        const inspector: InspectorOverlayRef = this.inspectorService.open(BasicCustomInspectorComponent, { size: size }, {
          visitId: 11,
          onClose: (data) => {
            console.log(data);
          },
          onResize: (data) => {
            console.log(data);
          }
        });
      }

      onSlideInComplete(inspector) {
        console.log(inspector, 'Slide IN animation finished');
      }

      onSlideOutComplete(inspector) {
        console.log(inspector, 'Slide OUT animation finished');
      }
      onResizeComplete(size: InspectorSize) {
        console.log(size, 'Resize animation finished');
      }

    }

    `;

  exampleModule =
    `
    @NgModule({
      ...
      declarations: [BasicCustomInspectorComponent],
      entryComponents: [BasicCustomInspectorComponent]
    })
    `;
}
