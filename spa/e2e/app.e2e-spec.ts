import { SpaPage } from './app.po';

describe('spa App', () => {
  let page: SpaPage;

  beforeEach(() => {
    page = new SpaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
