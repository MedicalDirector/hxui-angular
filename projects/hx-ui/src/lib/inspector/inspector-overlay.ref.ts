import {OverlayRef} from '@angular/cdk/overlay';
import {BreakpointObserver} from '@angular/cdk/layout';
import {InspectorSize} from './inspector-size.enum';
import {InspectorComponent} from './inspector.component';
import {Observable} from 'rxjs/index';

export class InspectorOverlayRef {

  inspectorInstance: InspectorComponent;

  constructor(private overlayRef: OverlayRef) {}

  close(): void {
    this.inspectorInstance.close();
  }

  resize(size: InspectorSize): void {
    this.inspectorInstance.resize(size);
  }
}
