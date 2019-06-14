import {Component, Inject, OnInit} from '@angular/core';
import {CoreBaseComponent} from '../core-base.component';
import {PageScrollService} from 'ngx-page-scroll';
import {DOCUMENT} from '@angular/common';
import {BreakpointObserver} from '@angular/cdk/layout';
import {OnlineStatusCode} from './online-status.code';
import {OnlineStatusService} from '../../../../projects/hx-ui/src/lib/utils/services/online-status.service';

@Component({
  selector: 'app-online-status',
  templateUrl: './online-status.component.html',
  styles: [':host { display:flex; flex: 1; min-width: 0; }']
})
export class OnlineStatusComponent extends CoreBaseComponent implements OnInit {

  code = new OnlineStatusCode();
  isOnline = true;

  constructor(protected pageScrollService: PageScrollService,
              protected breakpointObserver: BreakpointObserver,
              @Inject(DOCUMENT) protected document: any,
              private onlineStatusService: OnlineStatusService) {
    super(pageScrollService, breakpointObserver, document);
  }

  ngOnInit() {
    this.onlineStatusService.online.subscribe((data) => {
      this.isOnline = true;
    });
    this.onlineStatusService.offline.subscribe((data) => {
      this.isOnline = false;
    });
  }

}
