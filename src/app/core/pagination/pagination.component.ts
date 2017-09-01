import {Component, Inject, OnInit} from '@angular/core';
import {PageScrollService} from 'ng2-page-scroll';
import {DOCUMENT} from '@angular/platform-browser';
import {CoreBaseComponent} from '../core-base.component';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styles: [':host { display:flex; flex: 1; min-width: 0; }']
})
export class PaginationComponent extends CoreBaseComponent implements OnInit {
  public totalItems: number = 128;
  public currentPage: number = 4;
  public smallnumPages: number = 0;

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
