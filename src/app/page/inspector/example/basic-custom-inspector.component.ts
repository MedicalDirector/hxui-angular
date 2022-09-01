import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  InspectorOverlayRef,
  InspectorService,
  InspectorSize,
} from '@hxui/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'eg-basic-custom-inspector',
  template: `
    <div class="hx-toolbar">
      <span>Heading</span>
      <div class="hx-spacer"></div>
    </div>
    <div class="hx-toolbar">
      <span>Resize</span>
      <div class="hx-spacer"></div>
      <button class="hx-button is-flat" (click)="small()">Small</button>
      <button class="hx-button is-flat" (click)="large()">Large</button>
      <button class="hx-button is-flat" (click)="openInspector(sizeEnum.Small)">
        Open Another (SM)
      </button>
      <button class="hx-button is-flat" (click)="openInspector(sizeEnum.Large)">
        Open Another (LG)
      </button>
    </div>
  `,
  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ],
})
export class ExampleBasicCustomInspectorComponent implements OnInit, OnDestroy {
  protected onClose: (args: string) => void;
  protected onResize: (args: string) => void;
  protected visitId = 0;

  sizeEnum = InspectorSize;

  private subscriptions: Subscription = new Subscription();

  constructor(
    public inspectorRef: InspectorOverlayRef,
    private inspectorService: InspectorService
  ) {}

  ngOnInit() {
    console.log(this.visitId);
    this.subscriptions.add(
      this.inspectorRef.inspectorInstance.onSlideInComplete$.subscribe(_ =>
        this.onSlideInComplete(_)
      )
    );
    this.subscriptions.add(
      this.inspectorRef.inspectorInstance.onSlideOutComplete$.subscribe(_ =>
        this.onSlideOutComplete(_)
      )
    );
    this.subscriptions.add(
      this.inspectorRef.inspectorInstance.onResizeComplete$.subscribe(_ =>
        this.onResizeComplete(_)
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
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
    this.inspectorService.open(
      ExampleBasicCustomInspectorComponent,
      {
        size: size,
        hasClose: false,
        closeOnBackdropClick: true,
      },
      {
        visitId: 11,
        onClose: data => {
          console.log(data);
        },
        onResize: data => {
          console.log(data);
        },
      }
    );
  };

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
