import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxToastrComponent } from './ngx-toastr.component';

describe('NgSelectComponent', () => {
  let component: NgxToastrComponent;
  let fixture: ComponentFixture<NgxToastrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxToastrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxToastrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
