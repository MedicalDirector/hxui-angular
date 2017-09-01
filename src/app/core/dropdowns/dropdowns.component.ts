import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {PageScrollService} from 'ng2-page-scroll';
import {CoreBaseComponent} from '../core-base.component';
import {DOCUMENT} from '@angular/platform-browser';

@Component({
  selector: 'app-dropdowns',
  templateUrl: './dropdowns.component.html',
  styles: [':host { display:flex; flex: 1; min-width: 0; }']
})
export class DropdownsComponent extends CoreBaseComponent implements OnInit {

  constructor(protected pageScrollService: PageScrollService,
              @Inject(DOCUMENT) protected document: any) {
    super(pageScrollService, document);
  }



  ngOnInit() {
  }

}
