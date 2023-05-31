import { TEMPLATE, get } from '.';
import { PAGES } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import corePageVariables from '../../../helpers/page-variables/core/quote';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import { generateQuote } from '../../../generate-quote';
import mapQuoteToContent from '../../../helpers/data-content-mappings/map-quote-to-content';
import { quoteSummaryList } from '../../../helpers/summary-lists/quote-summary-list';
import { Request, Response } from '../../../../types';
import { mockReq, mockRes, mockSession } from '../../../test-mocks';

describe('controllers/quote/your-quote', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    req.session.submittedData = mockSession.submittedData;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.QUOTE.YOUR_QUOTE);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      const expectedQuote = generateQuote(req.session.submittedData);

      const quoteContent = mapQuoteToContent(expectedQuote);
      const expectedSummaryList = quoteSummaryList(quoteContent);

      const expectedVariables = {
        userName: getUserNameFromSession(req.session.user),
        ...corePageVariables({ PAGE_CONTENT_STRINGS: PAGES.QUOTE.YOUR_QUOTE, BACK_LINK: req.headers.referer, ORIGINAL_URL: req.originalUrl }),
        SUMMARY_LIST: expectedSummaryList,
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });

    it('should add a quote to the session with amountInGbp', () => {
      get(req, res);
      const { submittedData } = req.session;

      const expected = generateQuote(submittedData);

      expect(req.session.quote).toEqual(expected);
    });
  });
});
