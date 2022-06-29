import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../shared/shared.module';
import { MigrateV13Component } from './migrate-v13.component';

describe('MigrateV13Component', () => {
  let component: MigrateV13Component;
  let fixture: ComponentFixture<MigrateV13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [MigrateV13Component],
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
