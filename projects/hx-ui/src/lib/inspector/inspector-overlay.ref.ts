import {OverlayRef} from '@angular/cdk/overlay';
import {BreakpointObserver} from '@angular/cdk/layout';
import {InspectorSize} from './inspector-size.enum';

export class InspectorOverlayRef {

  private cssList = ['is-small','is-medium','is-large'];

  constructor(private overlayRef: OverlayRef) {}

  close(): void {
    this.overlayRef.dispose();
  }

  resize(size: InspectorSize) : void {
    if ( size < this.cssList.length) {
      this.overlayRef.removePanelClass(this.cssList);
      this.overlayRef.addPanelClass(this.cssList[size]);
    }
  }
}
