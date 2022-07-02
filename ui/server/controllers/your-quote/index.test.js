const controller = require('.');
const CONTENT_STRINGS = require('../../content-strings');
const { TEMPLATES } = require('../../constants');
const { generateQuote } = require('./generate-quote');
const mapQuoteToContent = require('../../helpers/data-content-mappings/map-quote-to-content');
const { generateQuoteSummaryList } = require('../../helpers/generate-quote-summary-list');
const {
  mockReq,
  mockRes,
  mockSession,
} = require('../../test-mocks');

describe('controllers/your-quote', () => {
  let req;
  let res;

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
    const expectedSummaryList = generateQuoteSummaryList(quoteContent);

    const expectedVariables = {
      CONTENT_STRINGS: {
        PRODUCT: CONTENT_STRINGS.PRODUCT,
        FOOTER: CONTENT_STRINGS.FOOTER,
        BUTTONS: CONTENT_STRINGS.BUTTONS,
        LINKS: CONTENT_STRINGS.LINKS,
        ...CONTENT_STRINGS.PAGES.YOUR_QUOTE_PAGE,
      },
      SUMMARY_LIST: expectedSummaryList,
    };

    expect(res.render).toHaveBeenCalledWith(TEMPLATES.YOUR_QUOTE, expectedVariables);
  });

  it('should add a quote to the session with amountInGbp', () => {
    controller(req, res);
    const { submittedData } = req.session;

    const expected = generateQuote(submittedData);

    expect(req.session.quote).toEqual(expected);
  });
});
