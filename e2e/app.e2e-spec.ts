import { InterviewHelperPage } from './app.po';

describe('interview-helper App', function() {
  let page: InterviewHelperPage;

  beforeEach(() => {
    page = new InterviewHelperPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
