import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters.component';
import { SharedModule } from 'app/shared/shared.module';
import { ExampleFilterOldComponent } from './examples/example-filter-old.component';
import { ExampleFilterNewComponent } from './examples/example-filter-new.component';
import { DatePipe } from '@angular/common';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          FiltersComponent,
          ExampleFilterNewComponent,
          ExampleFilterOldComponent
        ],
        imports: [SharedModule],
        providers: [DatePipe]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
