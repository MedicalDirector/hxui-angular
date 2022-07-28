import { TestBed, inject } from '@angular/core/testing';

import { OnlineStatusService } from './online-status.service';

describe('OnlineStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    providers: [OnlineStatusService],
    teardown: { destroyAfterEach: false }
});
  });

  it('should be created', inject([OnlineStatusService], (service: OnlineStatusService) => {
    expect(service).toBeTruthy();
  }));
});
