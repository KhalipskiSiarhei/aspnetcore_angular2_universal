import { Cliuniversal1Page } from './app.po';

describe('cliuniversal1 App', () => {
  let page: Cliuniversal1Page;

  beforeEach(() => {
    page = new Cliuniversal1Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
