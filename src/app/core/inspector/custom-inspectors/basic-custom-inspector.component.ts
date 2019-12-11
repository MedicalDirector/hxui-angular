import {Component, OnInit} from '@angular/core';
import {InspectorOverlayRef} from '../../../../../projects/hx-ui/src/lib/inspector/inspector-overlay.ref';
import {InspectorSize} from '../../../../../projects/hx-ui/src/lib/inspector/inspector-size.enum';

@Component({
  selector: 'app-basic-custom-inspector',
  template: `
    <div class="hx-toolbar">
      <span>Heading</span>
      <div class="hx-spacer"></div>
      <button class="hx-button is-flat" (click)="close()"><i class="hx-icon icon-close"></i></button>
    </div>
    <div class="hx-toolbar">
      <span>Resize</span>
      <div class="hx-spacer"></div>
      <button class="hx-button is-flat" (click)="small()">Small</button>
      <button class="hx-button is-flat" (click)="medium()">Medium</button>
      <button class="hx-button is-flat" (click)="large()">Large</button>
    </div>
  `,
  styles:[':host{ width:100% }']
})

export class BasicCustomInspectorComponent implements OnInit {

  protected onClose: Function;
  protected onResize: Function;

  constructor(public inspectorRef: InspectorOverlayRef) { }

  ngOnInit() {
  }

  close() {
    this.onClose('Closing');
    this.inspectorRef.close();
  }

  small() {
    this.onResize('Resizing!');
    this.inspectorRef.resize(InspectorSize.Small);
  }

  medium() {
    this.onResize('Resizing!');
    this.inspectorRef.resize(InspectorSize.Medium);
  }

  large() {
    this.onResize('Resizing!');
    this.inspectorRef.resize(InspectorSize.Large);
  }

}
