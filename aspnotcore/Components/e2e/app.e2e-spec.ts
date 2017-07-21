import { ComponentsPage } from './app.po';

describe('components App', () => {
  let page: ComponentsPage;

  beforeEach(() => {
    page = new ComponentsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
