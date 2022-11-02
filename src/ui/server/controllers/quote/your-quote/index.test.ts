import controller from '.';
import { PAGES } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import corePageVariables from '../../../helpers/page-variables/core/quote';

import { generateQuote } from '../../../generate-quote';
import mapQuoteToContent from '../../../helpers/data-content-mappings/map-quote-to-content';
import { quoteSummaryList } from '../../../helpers/summary-lists/quote-summary-list';
import { mockReq, mockRes, mockSession } from '../../../test-mocks';
import { Request, Response } from '../../../../types';

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

  it('should render template', () => {
    controller(req, res);

    const expectedQuote = generateQuote(req.session.submittedData);

    const quoteContent = mapQuoteToContent(expectedQuote);
    const expectedSummaryList = quoteSummaryList(quoteContent);

    const expectedVariables = {
      ...corePageVariables({ PAGE_CONTENT_STRINGS: PAGES.QUOTE.YOUR_QUOTE, BACK_LINK: req.headers.referer }),
      SUMMARY_LIST: expectedSummaryList,
    };

    expect(res.render).toHaveBeenCalledWith(TEMPLATES.QUOTE.YOUR_QUOTE, expectedVariables);
  });

  it('should add a quote to the session with amountInGbp', () => {
    controller(req, res);
    const { submittedData } = req.session;

    const expected = generateQuote(submittedData);

    expect(req.session.quote).toEqual(expected);
  });
});
