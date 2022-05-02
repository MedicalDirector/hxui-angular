import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DatepickersComponent } from './datepickers.component';
import { SharedModule } from 'app/shared/shared.module';

describe('DatepickersComponent', () => {
  let component: DatepickersComponent;
  let fixture: ComponentFixture<DatepickersComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DatepickersComponent],
        imports: [SharedModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
