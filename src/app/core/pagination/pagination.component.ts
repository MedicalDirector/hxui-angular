import {Component, Inject, OnInit} from '@angular/core';
import {PageScrollService} from 'ngx-page-scroll';
import {DOCUMENT} from '@angular/common';
import {CoreBaseComponent} from '../core-base.component';
import {PaginationCode} from './pagination.code';

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
              @Inject(DOCUMENT) protected document: any) {
    super(pageScrollService, document);
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
