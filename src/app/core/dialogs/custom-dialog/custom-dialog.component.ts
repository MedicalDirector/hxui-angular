import { Component, OnInit } from '@angular/core';
import {Modal} from '../../../../../projects/hx-ui/src/lib/modal/modal.annotation';
import {DialogOverlayRef} from '../../../../../projects/hx-ui/src/lib/dialog/dialog-overlay.ref';

@Component({
  selector: 'app-custom-dialog',
  template: `
    <div class="hx-modal is-active">
      <div class="hx-modal-background"></div>
      <div class="hx-modal-card">
        <header class="hx-modal-card-head">
          <h1 class="hx-modal-card-title">HxUI Modal Title</h1>
          <a class="hx-button is-round is-small is-white" (click)="onCancel()">
            <span class="hx-icon-control">
              <i class="icon icon-close-empty is-large"></i>
            </span>
          </a>
        </header>
        <section class="hx-modal-card-content">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.</p>
          <div class="hx-input-control" id="parentEL">
            <input class="hx-input" hxaTextInput type="text" [(ngModel)]="selected"
                   [typeahead]="medications" minWidthRelativeTo="parentEL">
            <label class="hx-label"><i class="icon icon-search is-small"></i> Medications</label>
            <div class="hx-help">Search for medication names</div>
          </div>
        </section>
        <footer class="hx-modal-card-foot">
          <button class="hx-button is-primary" (click)="onOk()">Save changes</button>
          <button class="hx-button" (click)="onCancel()">Cancel</button>
        </footer>
      </div>
    </div>
  `
})

export class CustomDialogComponent implements OnInit {

  protected onSuccess: Function;
  protected onCancelled: Function;
  public selected: string;
  public medications: string[] = [
    'SABRIL powder for oral solution 500mg',
    'SABRIL tablet 500mg',
    'SACROSIDASE oral liquid, solution 8,500 Units/mL',
    'SACUBITRIL/VALSARTAN tablet 24.3mg/25.7mg',
    'SACUBITRIL/VALSARTAN tablet 48.6mg/51.4mg',
    'SACUBITRIL/VALSARTAN tablet 97.3mg/102.8mg',
    'SAFLUTAN eye drops 0.0015% (4.5mcg/0.3mL)',
    'SAIZEN 8 CLICK.EASY powder for injection 8mg (24 units)',
    'SAIZEN powder for injection 3mg (10 units)',
    'SAIZEN injection 6mg (18 units)',
    'SAIZEN injection 12mg (36 units)',
    'SAIZEN injection 20mg (60 units)',
    'SALAZOPYRIN-EN enteric-coated tablet 500mg',
    'SALBUTAMOL ACTAVIS inhalation 2.5mg/2.5mL',
    'SALBUTAMOL ACTAVIS inhalation 5mg/2.5mL',
    'SALBUTAMOL SANDOZ inhalation 2.5mg/2.5mL',
    'SALBUTAMOL SANDOZ inhalation 5mg/2.5mL',
    'SALBUTAMOL metered-dose aerosol 100mcg/dose',
    'SALBUTAMOL injection 1mg/mL'];

  constructor(public dialogRef: DialogOverlayRef) { }

  ngOnInit() {
  }

  onCancel() {
    this.onCancelled('Cancelled!');
    this.dialogRef.close();
  }

  onOk() {
    this.onSuccess('Success!');
    this.dialogRef.close();
  }

}
