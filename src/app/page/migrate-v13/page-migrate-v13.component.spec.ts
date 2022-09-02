import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../shared/shared.module';
import { PageMigrateV13Component } from './page-migrate-v13.component';

describe('PageMigrateV13Component', () => {
  let component: PageMigrateV13Component;
  let fixture: ComponentFixture<PageMigrateV13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [PageMigrateV13Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageMigrateV13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
