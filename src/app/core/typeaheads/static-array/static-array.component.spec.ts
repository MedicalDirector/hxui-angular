import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticArrayComponent } from './static-array.component';

describe('StaticArrayComponent', () => {
  let component: StaticArrayComponent;
  let fixture: ComponentFixture<StaticArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
