import { TestBed, inject } from '@angular/core/testing';

import { TabularService } from './tabular.service';

describe('TabularService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TabularService]
    });
  });

  it('should ...', inject([TabularService], (service: TabularService) => {
    expect(service).toBeTruthy();
  }));
});
