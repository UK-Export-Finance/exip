const controller = require('.');
const CONTENT_STRINGS = require('../../content-strings');
const {
  FIELD_IDS,
  FIELD_VALUES,
  ROUTES,
  TEMPLATES,
} = require('../../constants');
const { mapAnswersToContent } = require('../../helpers/data-content-mappings/map-answers-to-content');
const { answersSummaryList } = require('../../helpers/summary-lists/answers-summary-list');

const { mockReq, mockRes, mockAnswers } = require('../../test-mocks');

const {
  AMOUNT,
  BUYER_COUNTRY,
  CAN_GET_PRIVATE_INSURANCE,
  CREDIT_PERIOD,
  CURRENCY,
  POLICY_TYPE,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  VALID_COMPANY_BASE,
} = FIELD_IDS;

describe('controllers/check-your-answers', () => {
  let req;
  let res;
  const mockSessionData = {
    [AMOUNT]: 123456,
    [BUYER_COUNTRY]: {
      name: mockAnswers[BUYER_COUNTRY],
      isoCode: 'FRA',
    },
    [CAN_GET_PRIVATE_INSURANCE]: true,
    [CREDIT_PERIOD]: 2,
    [CURRENCY]: {
      name: 'UK Sterling',
      isoCode: 'GBP',
    },
    [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTI,
    [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: 30,
    [VALID_COMPANY_BASE]: true,
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
      const expectedSummaryList = answersSummaryList(
        answers,
        mockSessionData[POLICY_TYPE],
      );

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.CHECK_YOUR_ANSWERS, {
        ...controller.PAGE_VARIABLES,
        BACK_LINK: req.headers.referer,
        SUMMARY_LIST: expectedSummaryList,
      });
    });
  });

  describe('post', () => {
    it(`should redirect to ${ROUTES.YOUR_QUOTE}`, () => {
      controller.post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(ROUTES.YOUR_QUOTE);
    });
  });
});
