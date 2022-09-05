import { Component, isDevMode } from '@angular/core';

@Component({
  selector: 'eg-basic-pagination',
  template: `
    <hx-pagination
      [totalItems]="totalItems"
      [(ngModel)]="currentPage"
      (pageChanged)="pageChanged($event)"
    ></hx-pagination>
    <br />
    <hx-pagination
      [boundaryLinks]="true"
      [totalItems]="totalItems"
      [(ngModel)]="currentPage"
      previousText="&lsaquo;"
      nextText="&rsaquo;"
      firstText="&laquo;"
      lastText="&raquo;"
    ></hx-pagination>
    <br />
    <hx-pagination
      [directionLinks]="false"
      [boundaryLinks]="true"
      [totalItems]="totalItems"
      [(ngModel)]="currentPage"
    ></hx-pagination>
    <br />
    <hx-pagination
      [directionLinks]="true"
      [boundaryLinks]="true"
      [rotate]="false"
      [totalItems]="totalItems"
      [maxSize]="7"
      [(ngModel)]="currentPage"
    ></hx-pagination>
    <br />
    <hx-pagination
      [directionLinks]="false"
      [totalItems]="totalItems"
      [(ngModel)]="currentPage"
      (numPages)="smallnumPages = $event"
    ></hx-pagination>
    <br />
    <hx-pager
      [totalItems]="totalItems"
      [(ngModel)]="currentPage"
      (pageChanged)="pageChanged($event)"
      pageBtnClass="hx-button"
      itemsPerPage="10"
    ></hx-pager>
    <br />

    <div class="hx-flex hx-flex-justify-center">
      <div>
        <pre>The selected page no: {{ currentPage }}/{{ smallnumPages }}</pre>
        <button type="button" class="hx-button is-info" (click)="setPage(3)">
          Set current page to: 3
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class ExampleBasicPaginationComponent {
  totalItems = 128;
  currentPage = 4;
  smallnumPages = 0;

  setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }

  pageChanged(event: any): void {
    isDevMode() && console.log('Page changed to: ' + event.page);
    isDevMode() && console.log('Number items per page: ' + event.itemsPerPage);
  }
}
