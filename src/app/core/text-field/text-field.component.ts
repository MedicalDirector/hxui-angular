import {Component, Inject, OnInit} from '@angular/core';
import {TextFieldCode} from './text-field.code';
import {PageScrollService} from 'ngx-page-scroll';
import {DOCUMENT} from '@angular/common';
import {CoreBaseComponent} from '../core-base.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent extends CoreBaseComponent implements OnInit {
  code = new TextFieldCode();


  form: any;



  constructor(
    protected pageScrollService: PageScrollService,
    @Inject(DOCUMENT) protected document: any,
    fb: FormBuilder
  ) {
    super(pageScrollService, document);
    this.form = fb.group({
      firstname: ['', Validators.required],
      surname: [''],
      email: ['', [Validators.email, Validators.required]]
    });
  }

  ngOnInit() {
  }


  submit() {
    if (this.form.dirty && this.form.valid) {
      alert(`Firstname: ${this.form.value.name} Email: ${this.form.value.email}`);
    }
  }


}
