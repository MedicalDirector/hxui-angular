import { inject, TestBed } from '@angular/core/testing';
import { PageTableService } from './page-table.service';

describe('PageTableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageTableService],
      teardown: { destroyAfterEach: false },
    });
  });

  it('should ...', inject([PageTableService], (service: PageTableService) => {
    expect(service).toBeTruthy();
  }));
});
