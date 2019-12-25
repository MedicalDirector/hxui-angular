import {Component, Inject, OnInit} from '@angular/core';
import {CoreBaseComponent} from '../core-base.component';
import {BreakpointObserver} from '@angular/cdk/layout';
import {DOCUMENT} from '@angular/common';
import {InspectorCode} from './inspector.code';
import {InspectorService} from '../../../../projects/hx-ui/src/lib/inspector/inspector.service';
import {InspectorOverlayRef} from '../../../../projects/hx-ui/src/lib/inspector/inspector-overlay.ref';
import {BasicCustomInspectorComponent} from './custom-inspectors/basic-custom-inspector.component';
import {PageScrollService} from 'ngx-page-scroll-core';
import {InspectorSize} from '../../../../projects/hx-ui/src/lib/inspector/inspector-size.enum';

@Component({
  selector: 'hxa-inspector',
  templateUrl: './inspector.component.html',
  styleUrls: ['./inspector.component.scss']
})
export class InspectorComponent extends CoreBaseComponent implements OnInit {

  code = new InspectorCode();
  constructor(protected pageScrollService: PageScrollService,
              protected breakpointObserver: BreakpointObserver,
              @Inject(DOCUMENT) protected document: any,
              private inspectorService: InspectorService) {
    super(pageScrollService, breakpointObserver, document);
  }

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
