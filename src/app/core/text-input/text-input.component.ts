import {Component, Inject, OnInit} from '@angular/core';
import {TextInputCode} from './text-input.code';
import {PageScrollService} from 'ngx-page-scroll';
import {DOCUMENT} from '@angular/common';
import {CoreBaseComponent} from '../core-base.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BreakpointsService} from '../../../../projects/hx-ui/src/lib/utils/breakpoint.service';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent extends CoreBaseComponent implements OnInit {
  code = new TextInputCode();

  constructor(
    protected pageScrollService: PageScrollService,
    protected breakpointsService: BreakpointsService,
    @Inject(DOCUMENT) protected document: any
  ) {
    super(pageScrollService, breakpointsService, document);
  }

  ngOnInit() {
  }

}
