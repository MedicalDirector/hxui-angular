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
  selector: 'eg-custom-template',
  template: `
    <form class="hx-card not-scrollable" [formGroup]="form">
      <div class="hx-card-content">
        <ng-select
          [items]="people$ | async"
          bindLabel="name"
          bindValue="id"
          placeholder="Select people"
          (keyup)="(onKeyup)"
          formControlName="selectedPersonId"
          class="custom-width"
        >
          <ng-template ng-label-tmp let-item="item">
            <img height="15" width="15" [src]="item.picture" />
            {{ item.name }}
          </ng-template>

          <ng-template
            ng-option-tmp
            let-item="item"
            let-index="index"
            let-search="searchTerm"
          >
            <div [ngOptionHighlight]="search">{{ item.name }}</div>
          </ng-template>
        </ng-select>

        <br />Selected: {{ form.get('selectedPersonId')?.value ?? [] }}
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
export class ExampleCustomTemplateComponent implements OnInit {
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

  onKeyup(val) {
    console.log(val);
  }
}
