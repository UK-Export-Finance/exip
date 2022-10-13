import { PAGE_VARIABLES, get, post } from '.';
import { BUTTONS, COOKIES_CONSENT, FOOTER, LINKS, PAGES, PRODUCT } from '../../../content-strings';
import { FIELD_IDS, FIELD_VALUES, ROUTES, TEMPLATES } from '../../../constants';
import { mapAnswersToContent } from '../../../helpers/data-content-mappings/map-answers-to-content';
import { answersSummaryList } from '../../../helpers/summary-lists/answers-summary-list';
import { mockAnswers, mockReq, mockRes } from '../../../test-mocks';
import { Request, Response } from '../../../../types';

const { BUYER_COUNTRY, CREDIT_PERIOD, CURRENCY, MAX_AMOUNT_OWED, POLICY_TYPE, HAS_MINIMUM_UK_GOODS_OR_SERVICES, VALID_COMPANY_BASE } = FIELD_IDS;

describe('controllers/quote/check-your-answers', () => {
  let req: Request;
  let res: Response;

  const mockSessionData = {
    [BUYER_COUNTRY]: {
      name: mockAnswers[BUYER_COUNTRY],
      isoCode: 'FRA',
    },
    [CREDIT_PERIOD]: 2,
    [CURRENCY]: {
      name: 'UK Sterling',
      isoCode: 'GBP',
    },
    [MAX_AMOUNT_OWED]: 1234,
    [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTI,
    [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: true,
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
          BUTTONS,
          COOKIES_CONSENT,
          FOOTER,
          LINKS,
          PRODUCT,
          ...PAGES.QUOTE.CHECK_YOUR_ANSWERS,
        },
      };

      expect(PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      const answers = mapAnswersToContent(mockSessionData);

      const expectedSummaryList = answersSummaryList(answers);

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.QUOTE.CHECK_YOUR_ANSWERS, {
        ...PAGE_VARIABLES,
        BACK_LINK: req.headers.referer,
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
