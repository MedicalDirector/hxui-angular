import { AngularHxuiPage } from './app.po';

describe('angular-hxui App', () => {
  let page: AngularHxuiPage;

  beforeEach(() => {
    page = new AngularHxuiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
