import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MigrateV13Component } from './migrate-v13.component';

describe('MigrateV13Component', () => {
  let component: MigrateV13Component;
  let fixture: ComponentFixture<MigrateV13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MigrateV13Component]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MigrateV13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
