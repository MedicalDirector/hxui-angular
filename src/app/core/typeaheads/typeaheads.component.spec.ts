import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeaheadsComponent } from './typeaheads.component';
import {AppModule} from '../../app.module';

describe('TypeaheadsComponent', () => {
  let component: TypeaheadsComponent;
  let fixture: ComponentFixture<TypeaheadsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeaheadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
