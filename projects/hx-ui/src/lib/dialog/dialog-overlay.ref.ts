import { OverlayRef } from '@angular/cdk/overlay';

export class DialogOverlayRef {

  constructor(private overlayRef: OverlayRef) { }

  close(): void {
    this.overlayRef.dispose();
  }
}
