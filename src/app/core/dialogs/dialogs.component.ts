import {Component, Inject, OnInit} from '@angular/core';
import {CoreBaseComponent} from '../core-base.component';
import {DialogsCode} from './dialogs.code';
import {PageScrollService} from 'ngx-page-scroll';
import {BreakpointObserver} from '@angular/cdk/layout';
import {DOCUMENT} from '@angular/common';
import {DialogService} from '../../../../projects/hx-ui/src/lib/dialog/dialog.service';
import {CustomDialogComponent} from './custom-dialog/custom-dialog.component';
import {DialogOverlayRef} from '../../../../projects/hx-ui/src/lib/dialog/dialog-overlay.ref';

@Component({
  selector: 'hxa-dialogs',
  templateUrl: './dialogs.component.html',
  styles: [':host { display:flex; flex: 1; min-width: 0; }']
})
export class DialogsComponent extends CoreBaseComponent implements OnInit {

  code = new DialogsCode();
  constructor(protected pageScrollService: PageScrollService,
              protected breakpointObserver: BreakpointObserver,
              @Inject(DOCUMENT) protected document: any,
              private dialogService: DialogService) {
    super(pageScrollService, breakpointObserver, document);
  }

  ngOnInit() {
  }

  openDialog = () => {
    const dialog: DialogOverlayRef = this.dialogService.open(CustomDialogComponent, {}, {
      onSuccess: (data) => {
        alert(data);
      },
      onCancelled: (data) => {
        alert(data);
      }
    });
  }
}
