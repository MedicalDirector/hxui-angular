export class PaginationCode {

usage =
`
import {PaginationModule} from "@hxui/angular";

@NgModule({
  imports: [PaginationModule.forRoot(),...]
})
export class AppModule(){}

`;

exampleTemplate =
`
<hx-pagination [totalItems]="totalItems" [(ngModel)]="currentPage" (pageChanged)="pageChanged($event)"></hx-pagination>
<br>
<hx-pagination [boundaryLinks]="true" [totalItems]="totalItems" [(ngModel)]="currentPage" previousText="&lsaquo;"
  nextText="&rsaquo;" firstText="&laquo;" lastText="&raquo;"></hx-pagination>
<br>
<hx-pagination [directionLinks]="false" [boundaryLinks]="true" [totalItems]="totalItems" [(ngModel)]="currentPage"></hx-pagination>
<br>
<hx-pagination [directionLinks]="true" [boundaryLinks]="true" [rotate]="false" [totalItems]="totalItems"
  [maxSize]="7" [(ngModel)]="currentPage"></hx-pagination>
<br>
<hx-pagination [directionLinks]="false" [totalItems]="totalItems" [(ngModel)]="currentPage"
  (numPages)="smallnumPages = $event"></hx-pagination>
<br>
<hx-pager [totalItems]="totalItems" [(ngModel)]="currentPage" (pageChanged)="pageChanged($event)"
  pageBtnClass="hx-button" itemsPerPage="10"></hx-pager>
<br>

<pre>The selected page no: 4/13</pre>
<button type="button" class="hx-button is-info" (click)="setPage(3)">Set current page to: 3</button>

`;

exampleTypescript =
`
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnInit {
  public totalItems: number = 128;
  public currentPage: number = 4;
  public smallnumPages: number = 0;

  constructor() { }

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

`;
}
