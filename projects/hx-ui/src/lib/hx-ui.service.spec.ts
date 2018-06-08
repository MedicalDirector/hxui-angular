import { TestBed, inject } from '@angular/core/testing';

import { HxUiService } from './hx-ui.service';

describe('HxUiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HxUiService]
    });
  });

  it('should be created', inject([HxUiService], (service: HxUiService) => {
    expect(service).toBeTruthy();
  }));
});
