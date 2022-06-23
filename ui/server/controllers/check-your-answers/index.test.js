const controller = require('.');
const CONTENT_STRINGS = require('../../content-strings');
const { ROUTES, TEMPLATES, FIELD_IDS } = require('../../constants');
const { mapAnswersToContent } = require('../../helpers/map-answers-to-content');
const { generateSummaryList } = require('../../helpers/generate-summary-list');

const { mockReq, mockRes, mockAnswers } = require('../../test-mocks');

const {
  VALID_COMPANY_BASE,
  BUYER_COUNTRY,
  TRIED_PRIVATE_COVER,
  UK_CONTENT_PERCENTAGE,
  CURRENCY,
  AMOUNT,
  CREDIT_PERIOD,
} = FIELD_IDS;

describe('controllers/check-your-answers', () => {
  let req;
  let res;
  const mockSessionData = {
    [VALID_COMPANY_BASE]: true,
    [BUYER_COUNTRY]: {
      name: mockAnswers[BUYER_COUNTRY],
      isoCode: 'FRA',
    },
    [TRIED_PRIVATE_COVER]: true,
    [UK_CONTENT_PERCENTAGE]: 30,
    [CURRENCY]: {
      name: 'UK Sterling',
      isoCode: 'GBP',
    },
    [AMOUNT]: 123456,
    [CREDIT_PERIOD]: 24,
  };

  beforeEach(() => {
    req = mockReq();
    req.session = {
      submittedData: mockSessionData,
    };

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
      };

      expect(controller.PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      controller.get(req, res);

      const answers = mapAnswersToContent(mockSessionData);
      const expectedSummaryList = generateSummaryList(answers);

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.CHECK_YOUR_ANSWERS, {
        ...controller.PAGE_VARIABLES,
        BACK_LINK: req.headers.referer,
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
