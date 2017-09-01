import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeaheadsComponent } from './typeaheads.component';

describe('TypeaheadsComponent', () => {
  let component: TypeaheadsComponent;
  let fixture: ComponentFixture<TypeaheadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeaheadsComponent ]
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
