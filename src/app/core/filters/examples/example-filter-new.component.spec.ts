import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleFilterNewComponent } from './example-filter-new.component';

describe('ExampleFilterNewComponent', () => {
  let component: ExampleFilterNewComponent;
  let fixture: ComponentFixture<ExampleFilterNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleFilterNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleFilterNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
