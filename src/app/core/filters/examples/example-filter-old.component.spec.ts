import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleFilterOldComponent } from './example-filter-old.component';

describe('ExampleFilterOldComponent', () => {
  let component: ExampleFilterOldComponent;
  let fixture: ComponentFixture<ExampleFilterOldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleFilterOldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleFilterOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
