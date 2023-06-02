import { TEMPLATE, get, post } from '.';
import { PAGES } from '../../../content-strings';
import { FIELD_IDS, FIELD_VALUES, GBP_CURRENCY_CODE, ROUTES, TEMPLATES } from '../../../constants';
import { mapAnswersToContent } from '../../../helpers/data-content-mappings/map-answers-to-content';
import { answersSummaryList } from '../../../helpers/summary-lists/answers-summary-list';
import corePageVariables from '../../../helpers/page-variables/core/quote';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../types';
import { mockAnswers, mockReq, mockRes } from '../../../test-mocks';

const {
  ELIGIBILITY: { BUYER_COUNTRY, CREDIT_PERIOD, CURRENCY, MAX_AMOUNT_OWED, HAS_MINIMUM_UK_GOODS_OR_SERVICES, VALID_EXPORTER_LOCATION },
  POLICY_TYPE,
} = FIELD_IDS;

describe('controllers/quote/check-your-answers', () => {
  let req: Request;
  let res: Response;

  const mockSessionData = {
    quoteEligibility: {
      [BUYER_COUNTRY]: {
        name: mockAnswers[BUYER_COUNTRY],
        isoCode: 'FRA',
      },
      [CREDIT_PERIOD]: 2,
      [CURRENCY]: {
        name: 'UK Sterling',
        isoCode: GBP_CURRENCY_CODE,
      },
      [MAX_AMOUNT_OWED]: 1234,
      [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTIPLE,
      [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: true,
      [VALID_EXPORTER_LOCATION]: true,
    },
    insuranceEligibility: {},
  };

  beforeEach(() => {
    req = mockReq();
    req.session = {
      submittedData: mockSessionData,
    };

    res = mockRes();
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.QUOTE.CHECK_YOUR_ANSWERS);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      const answers = mapAnswersToContent(mockSessionData.quoteEligibility);

      const expectedSummaryList = answersSummaryList(answers);

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.QUOTE.CHECK_YOUR_ANSWERS, {
        ...corePageVariables({ PAGE_CONTENT_STRINGS: PAGES.QUOTE.CHECK_YOUR_ANSWERS, BACK_LINK: req.headers.referer, ORIGINAL_URL: req.originalUrl }),
        userName: getUserNameFromSession(req.session.user),
        SUMMARY_LIST: expectedSummaryList,
      });
    });
  });

  describe('post', () => {
    it(`should redirect to ${ROUTES.QUOTE.YOUR_QUOTE}`, () => {
      post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(ROUTES.QUOTE.YOUR_QUOTE);
    });
  });
});
