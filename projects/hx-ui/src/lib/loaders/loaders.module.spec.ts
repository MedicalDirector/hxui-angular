import { LoadersModule } from './loaders.module';

describe('LoadersModule', () => {
  let loadersModule: LoadersModule;

  beforeEach(() => {
    loadersModule = new LoadersModule();
  });

  it('should create an instance', () => {
    expect(loadersModule).toBeTruthy();
  });
});
