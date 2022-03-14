import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DatepickersComponent } from './datepickers.component';
import {AppModule} from '../../app.module';

describe('DatepickersComponent', () => {
  let component: DatepickersComponent;
  let fixture: ComponentFixture<DatepickersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
