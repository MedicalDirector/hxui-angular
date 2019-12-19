import {Component, Inject, OnInit} from '@angular/core';
import { PageScrollService } from 'ngx-page-scroll-core';
import {DOCUMENT} from '@angular/common';
import {CoreBaseComponent} from '../core-base.component';
import {PaginationCode} from './pagination.code';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styles: [':host { display:flex; flex: 1; min-width: 0; }']
})
export class PaginationComponent extends CoreBaseComponent implements OnInit {

  code = new PaginationCode();
  public totalItems = 128;
  public currentPage = 4;
  public smallnumPages = 0;

  constructor(protected pageScrollService: PageScrollService,
              protected breakpointObserver: BreakpointObserver,
              @Inject(DOCUMENT) protected document: any) {
    super(pageScrollService, breakpointObserver, document);
  }

  public setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }

  public pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }

  ngOnInit() {
  }

}
