import { LibraryPage } from './app.po';

describe('library App', () => {
  let page: LibraryPage;

  beforeEach(() => {
    page = new LibraryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
