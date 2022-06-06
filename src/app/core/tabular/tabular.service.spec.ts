import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { TabularService } from './tabular.service';

describe('TabularService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TabularService]
    });
  });

  it('should ...', inject([TabularService], (service: TabularService) => {
    expect(service).toBeTruthy();
  }));
});
