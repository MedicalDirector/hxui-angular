import { TestBed, inject } from '@angular/core/testing';

import { TabularService } from './tabular.service';
import {AppModule} from '../../app.module';

describe('TabularService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [AppModule],
    teardown: { destroyAfterEach: false }
});
  });

  it('should ...', inject([TabularService], (service: TabularService) => {
    expect(service).toBeTruthy();
  }));
});
