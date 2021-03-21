import { TestBed } from '@angular/core/testing';

import { InspectorService } from './inspector.service';

describe('InspectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InspectorService = TestBed.get(InspectorService);
    expect(service).toBeTruthy();
  });
});
