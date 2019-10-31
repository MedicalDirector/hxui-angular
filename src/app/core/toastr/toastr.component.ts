import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {BreakpointObserver} from '@angular/cdk/layout';
import { PageScrollService } from 'ngx-page-scroll-core';
import {CoreBaseComponent} from '../core-base.component';
import {ToastrCode} from './toastr.code';
import {ToastrService} from '../../../../projects/hx-ui/src/lib/toastr/toastr.service';

@Component({
  selector: 'app-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.scss']
})
export class ToastrComponent extends CoreBaseComponent implements OnInit {
  code = new ToastrCode();

  constructor(
    protected pageScrollService: PageScrollService,
    protected breakpointObserver: BreakpointObserver,
    private toastrService: ToastrService,
    @Inject(DOCUMENT) protected document: any
  ) {
    super(pageScrollService, breakpointObserver, document);
  }

  ngOnInit() {
  }

  showToast() {
    this.toastrService.show('Helix app available for install', '', { disableTimeOut: true, closeButton: true, tapToDismiss: false });
  }

}
