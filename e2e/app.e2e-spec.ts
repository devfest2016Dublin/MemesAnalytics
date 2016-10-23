import { SweetHomePage } from './app.po';

describe('sweet-home App', function() {
  let page: SweetHomePage;

  beforeEach(() => {
    page = new SweetHomePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
