import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { SharedModule } from '../../shared/shared.module';
import { InMemoryDataService } from './in-memory-data.service';
import { TabularComponent } from './tabular.component';
import { TabularService } from './tabular.service';

describe('TabularComponent', () => {
  let component: TabularComponent;
  let fixture: ComponentFixture<TabularComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService, {
          dataEncapsulation: false
        })
      ],
      declarations: [TabularComponent],
      providers: [TabularService, InMemoryDataService, DatePipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
