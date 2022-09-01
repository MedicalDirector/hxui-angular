import { Component } from '@angular/core';
import { Contents } from 'src/app/shared/page-base/page-base.model';
import { PagePaginationCode } from './page-pagination.code';

@Component({
  selector: 'app-page-pagination',
  templateUrl: './page-pagination.component.html',
  styles: [':host { display: contents; }'],
})
export class PagePaginationComponent {
  code = new PagePaginationCode();
  contents: Contents[] = [
    { text: 'Usage', link: 'usage' },
    { text: 'Examples', link: 'example' },
    { text: 'API reference', link: 'api' },
  ];

  totalItems = 128;
  currentPage = 4;
  smallnumPages = 0;

  setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }

  pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }
}
