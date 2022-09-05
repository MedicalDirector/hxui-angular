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
  selector: 'eg-multi-select',
  template: `
    <form class="hx-card not-scrollable" [formGroup]="form">
      <div class="hx-card-content">
        <ng-select
          [items]="people$ | async"
          [multiple]="true"
          [closeOnSelect]="false"
          [searchable]="true"
          bindLabel="name"
          placeholder="Select people"
          formControlName="selectedPeople"
          class="is-badge is-outlined"
        >
          <ng-template ng-label-tmp let-item="item" let-clear="clear">
            <span class="hx-badge is-outlined">
              <span class="hx-badge-content">
                {{ item.name }}
                <button
                  class="hx-delete is-small"
                  (click)="clear(item)"
                  aria-hidden="true"
                ></button>
              </span>
            </span>
          </ng-template>
        </ng-select>

        <div class="mt-3">
          Selected value: <br />
          <ul>
            <li *ngFor="let item of form.get('selectedPeople')?.value ?? []">
              {{ item.name }}
            </li>
          </ul>
          <button (click)="clearModel()" class="hx-button mr-2">
            Clear model
          </button>
          <button (click)="changeModel()" class="hx-button is-primary">
            Change model
          </button>
        </div>
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
export class ExampleMultiSelectComponent implements OnInit {
  people$: Observable<Person[]>;
  form: FormGroup;

  constructor(private _dataService: DataService, private _fb: FormBuilder) {}

  ngOnInit() {
    this.form = this._fb.group({
      selectedPeople: new FormControl(
        [{ name: 'Karyn Wright' }],
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
}
