import {TextInputModule} from './text-input.module';

describe('TextFieldModule', () => {
  let textFieldModule: TextInputModule;

  beforeEach(() => {
    textFieldModule = new TextInputModule();
  });

  it('should create an instance', () => {
    expect(textFieldModule).toBeTruthy();
  });
});
