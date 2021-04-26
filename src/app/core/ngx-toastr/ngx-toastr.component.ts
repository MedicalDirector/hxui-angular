import {Component, Inject, OnInit} from '@angular/core';
import {CoreBaseComponent} from '../core-base.component';
import {PageScrollService} from 'ngx-page-scroll-core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {DOCUMENT} from '@angular/common';
import {NgxToastrCode} from './ngx-toastr.code';
import {Observable, Subject} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-ng-select',
  templateUrl: './ngx-toastr.component.html',
  styleUrls: ['./ngx-toastr.component.scss']
})
export class NgxToastrComponent extends CoreBaseComponent implements OnInit {

  public code = new NgxToastrCode();
  people$: Observable<any[]>;
  peopleInput$ = new Subject<string>();

  form: FormGroup

  constructor(
    protected pageScrollService: PageScrollService,
    protected breakpointObserver: BreakpointObserver,
    @Inject(DOCUMENT) protected document: any,
    private toastr: ToastrService
  ) {
    super(pageScrollService, breakpointObserver, document);
  }

  ngOnInit() {

  }

  showSuccess(title?: string){
    this.toastr.success('The action performed was successful.',title, {closeButton: true, disableTimeOut: true});
  }

  showError(title?: string){
    this.toastr.error('An issue occurred with the action performed.',title);
  }

  showInfo(title?: string){
    this.toastr.info("Notice, this notice you should notice it's worth noticing.", title);
  }

  showWarning(title?: string){
    this.toastr.warning('Performing this action could have consequence.', title);
  }

}
