import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService, Person } from './data.service';

@Component({
  selector: 'eg-single-select',
  template: `
    <form class="hx-card not-scrollable" [formGroup]="form">
      <div class="hx-card-content">
        <ng-select
          [items]="people$ | async"
          bindLabel="name"
          bindValue="id"
          placeholder="Select people"
          formControlName="selectedPersonId"
        >
        </ng-select>

        <br />

        <p>Selected: {{ form.get('selectedPersonId')?.value ?? '' }}</p>
      </div>
    </form>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class ExampleSingleSelectComponent implements OnInit {
  people$: Observable<Person[]>;
  form: FormGroup;

  constructor(private _dataService: DataService, private _fb: FormBuilder) {}

  ngOnInit() {
    this.form = this._fb.group({
      selectedPersonId: new FormControl(
        '5a15b13c36e7a7f00cf0d7cb',
        Validators.required
      ),
    });

    this.people$ = this._dataService.getPeople();
  }
}
