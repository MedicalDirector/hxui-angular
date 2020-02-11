import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {BreakpointObserver} from '@angular/cdk/layout';
import {PageScrollService} from 'ngx-page-scroll-core';
import {LineClampCode} from './line-clamp.code';
import {CoreBaseComponent} from '../core-base.component';

@Component({
  selector: 'hx-line-clamp',
  templateUrl: './line-clamp.component.html',
  styleUrls: ['./line-clamp.component.scss']
})
export class LineClampComponent extends CoreBaseComponent implements OnInit {

  code = new LineClampCode();
  message: string;


  constructor(
    protected pageScrollService: PageScrollService,
    protected breakpointObserver: BreakpointObserver,
    @Inject(DOCUMENT) protected document: any
  ) {
    super(pageScrollService, breakpointObserver, document);
  }

  ngOnInit() {
    this.message = Array.apply(null, Array(100)).map(() => 'Lorem ipsum dolor sit amet').join(', ');
  }


}
