import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Contents } from 'src/app/shared/page-base/page-base.model';
import { DataService } from './data.service';
import { PageSelectCode } from './page-select.code';

@Component({
  selector: 'app-page-select',
  templateUrl: './page-select.component.html',
  styles: [':host { display: contents; }'],
})
export class PageSelectComponent implements OnInit {
  code = new PageSelectCode();
  contents: Contents[] = [
    { text: 'Installation', link: 'install' },
    { text: 'Usage', link: 'usage' },
    { text: 'Multi-select example', link: 'example-multi' },
    { text: 'Single-select example', link: 'example-single' },
    { text: 'Custom template example', link: 'example-template-custom' },
    { text: 'API reference', link: 'api' },
    { text: 'Styles changelog', link: 'changelog' },
  ];

  people$: Observable<any[]>;
  form: FormGroup;

  constructor(private _dataService: DataService, private _fb: FormBuilder) {}

  ngOnInit() {
    this.form = this._fb.group({
      selectedPeople: new FormControl(
        [{ name: 'Karyn Wright' }],
        Validators.required
      ),
      selectedPersonId: new FormControl(
        '5a15b13c36e7a7f00cf0d7cb',
        Validators.required
      ),
    });

    this.people$ = this._dataService.getPeople();
  }

  clearModel() {
    this.form.get('selectedPeople').patchValue([]);
  }

  changeModel() {
    this.form.get('selectedPeople').patchValue([{ name: 'New person' }]);
  }

  onKeyup(val) {
    console.log(val);
  }
}
