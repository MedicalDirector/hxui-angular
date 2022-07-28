import { inject, TestBed } from '@angular/core/testing';
import { TabularService } from './tabular.service';

describe('TabularService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TabularService],
      teardown: { destroyAfterEach: false },
    });
  });

  it('should ...', inject([TabularService], (service: TabularService) => {
    expect(service).toBeTruthy();
  }));
});
