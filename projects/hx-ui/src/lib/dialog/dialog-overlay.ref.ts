import { OverlayRef } from '@angular/cdk/overlay';
import {Injectable} from "@angular/core";

@Injectable()
export class DialogOverlayRef {

  constructor(private overlayRef: OverlayRef) { }

  close(): void {
    this.overlayRef.dispose();
  }
}
