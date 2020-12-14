import { OverlayRef } from '@angular/cdk/overlay';
import {Injectable} from "@angular/core";

export class DialogOverlayRef {

  constructor(private overlayRef: OverlayRef) { }

  close(): void {
    this.overlayRef.dispose();
  }
}
