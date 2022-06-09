const controller = require('.');
const CONTENT_STRINGS = require('../../content-strings');
const { ROUTES, TEMPLATES } = require('../../constants');
const { mapAnswersToContent } = require('../../helpers/map-answers-to-content');
const { generateSummaryList } = require('../../helpers/generate-summary-list');

const { mockReq, mockRes, mockAnswers } = require('../../test-mocks');

describe('controllers/check-your-answers', () => {
  let req;
  let res;

  beforeEach(() => {
    req = mockReq();
    req.session.submittedData = mockAnswers;

    res = mockRes();
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        CONTENT_STRINGS: {
          PRODUCT: CONTENT_STRINGS.PRODUCT,
          FOOTER: CONTENT_STRINGS.FOOTER,
          LINKS: CONTENT_STRINGS.LINKS,
          BUTTONS: CONTENT_STRINGS.BUTTONS,
          ...CONTENT_STRINGS.PAGES.CHECK_YOUR_ANSWERS_PAGE,
        },
        BACK_LINK: ROUTES.TELL_US_ABOUT_YOUR_DEAL,
      };

      expect(controller.PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      controller.get(req, res);

      const expectedSummaryList = generateSummaryList(mapAnswersToContent(mockAnswers));

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.CHECK_YOUR_ANSWERS, {
        ...controller.PAGE_VARIABLES,
        SUMMARY_LIST: expectedSummaryList,
      });
    });
  });

  describe('post', () => {
    it(`should redirect to ${ROUTES.PREMIUM_QUOTE}`, () => {
      controller.post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(ROUTES.PREMIUM_QUOTE);
    });
  });
});
