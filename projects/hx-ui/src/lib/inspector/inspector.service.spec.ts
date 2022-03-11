import { TestBed } from '@angular/core/testing';
import { InspectorService } from './inspector.service';
import { Overlay } from '@angular/cdk/overlay';

describe('InspectorService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [InspectorService, Overlay]
    })
  );

  it('should be created', () => {
    const service: InspectorService = TestBed.get(InspectorService);
    expect(service).toBeTruthy();
  });
});
