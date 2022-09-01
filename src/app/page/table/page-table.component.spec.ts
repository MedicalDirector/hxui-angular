import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SharedModule } from '../../shared/shared.module';
import { PageTableComponent } from './page-table.component';
import { PageTableService } from './page-table.service';

describe('PageTableComponent', () => {
  let component: PageTableComponent;
  let fixture: ComponentFixture<PageTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [PageTableComponent],
      providers: [PageTableService, DatePipe],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
