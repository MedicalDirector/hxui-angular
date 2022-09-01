import { Code } from 'src/app/shared/page-base/page-base.model';

export class PagePaginationCode {
  usage: Code = {
    lang: ['ts'],
    text: `import { PaginationModule } from "@hxui/angular";

@NgModule({
  imports: [
    PaginationModule.forRoot(),
    ...
  ]
})
export class AppModule {}
`,
  };

  egBasicHTML: Code = {
    lang: ['xml'],
    text: `<hx-pagination
  [totalItems]="totalItems"
  [(ngModel)]="currentPage"
  (pageChanged)="pageChanged($event)"
></hx-pagination>

<hx-pagination
  [boundaryLinks]="true"
  [totalItems]="totalItems"
  [(ngModel)]="currentPage"
  previousText="&lsaquo;"
  nextText="&rsaquo;"
  firstText="&laquo;"
  lastText="&raquo;"
></hx-pagination>

<hx-pagination
  [directionLinks]="false"
  [boundaryLinks]="true"
  [totalItems]="totalItems"
  [(ngModel)]="currentPage"
></hx-pagination>

<hx-pagination
  [directionLinks]="true"
  [boundaryLinks]="true"
  [rotate]="false"
  [totalItems]="totalItems"
  [maxSize]="7"
  [(ngModel)]="currentPage"
></hx-pagination>

<hx-pagination
  [directionLinks]="false"
  [totalItems]="totalItems"
  [(ngModel)]="currentPage"
  (numPages)="smallnumPages = $event"
></hx-pagination>

<hx-pager
  [totalItems]="totalItems"
  [(ngModel)]="currentPage"
  (pageChanged)="pageChanged($event)"
  pageBtnClass="hx-button"
  itemsPerPage="10"
></hx-pager>
`,
  };

  egBasicTS: Code = {
    lang: ['ts'],
    text: `import { Component } from '@angular/core';

@Component({
  selector: 'app-myfeature',
  templateUrl: './myfeature.component.html'
})
export class MyFeatureComponent {
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
`,
  };
}
