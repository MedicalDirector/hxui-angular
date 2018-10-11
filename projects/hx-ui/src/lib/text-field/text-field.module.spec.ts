import { TextFieldModule } from './text-field.module';

describe('TextFieldModule', () => {
  let textFieldModule: TextFieldModule;

  beforeEach(() => {
    textFieldModule = new TextFieldModule();
  });

  it('should create an instance', () => {
    expect(textFieldModule).toBeTruthy();
  });
});
