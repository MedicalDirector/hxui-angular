import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SharedModule } from '../../shared/shared.module';
import { ExampleFilterNewComponent } from './example/filter-new.component';
import { ExampleFilterOldComponent } from './example/filter-old.component';
import { PageFilterComponent } from './page-filter.component';

describe('PageFilterComponent', () => {
  let component: PageFilterComponent;
  let fixture: ComponentFixture<PageFilterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        PageFilterComponent,
        ExampleFilterNewComponent,
        ExampleFilterOldComponent,
      ],
      imports: [SharedModule],
      providers: [DatePipe],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
