import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../../shared/shared.module';
import { ExampleFilterOldComponent } from './filter-old.component';

describe('ExampleFilterOldComponent', () => {
  let component: ExampleFilterOldComponent;
  let fixture: ComponentFixture<ExampleFilterOldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExampleFilterOldComponent],
      imports: [SharedModule],
      providers: [DatePipe],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
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
