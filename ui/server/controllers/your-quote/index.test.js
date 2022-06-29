const controller = require('.');
const CONTENT_STRINGS = require('../../content-strings');
const {
  TEMPLATES,
  FIELD_IDS,
} = require('../../constants');
const api = require('../../api');
const { generateQuote } = require('./generate-quote');
const mapQuoteToContent = require('./map-quote-to-content');
const { generateQuoteSummaryList } = require('../../helpers/generate-quote-summary-list');
const {
  mockReq,
  mockRes,
  mockSession,
} = require('../../test-mocks');

describe('controllers/your-quote', () => {
  let req;
  let res;
  const mockCurrencyExchangeRateResponse = {
    exchangeRate: 1.23,
  };

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    req.session.submittedData = mockSession.submittedData;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should render template', async () => {
    await controller(req, res);

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

  describe('when a currency code is GBP', () => {
    const getCurrencyExchangeRateSpy = jest.fn(() => Promise.resolve(mockCurrencyExchangeRateResponse));

    beforeEach(() => {
      api.getCurrencyExchangeRate = getCurrencyExchangeRateSpy;
    });

    it('should NOT call api.getCurrencyExchangeRate', async () => {
      await controller(req, res);

      expect(getCurrencyExchangeRateSpy).toHaveBeenCalledTimes(0);
    });

    it('should add a quote to the session', async () => {
      await controller(req, res);

      const expected = generateQuote(req.session.submittedData);

      expect(req.session.quote).toEqual(expected);
    });
  });

  describe('when a currency code is NOT GBP', () => {
    const getCurrencyExchangeRateSpy = jest.fn(() => Promise.resolve(mockCurrencyExchangeRateResponse));

    beforeEach(() => {
      req.session.submittedData[FIELD_IDS.CURRENCY] = {
        isoCode: 'EUR',
      };
      api.getCurrencyExchangeRate = getCurrencyExchangeRateSpy;
    });

    it('should call api.getCurrencyExchangeRate', async () => {
      await controller(req, res);

      expect(getCurrencyExchangeRateSpy).toHaveBeenCalledTimes(1);
      expect(getCurrencyExchangeRateSpy).toHaveBeenCalledWith(
        'EUR',
        'GBP',
      );
    });

    it('should add a quote to the session with amountInGbp', async () => {
      await controller(req, res);
      const { submittedData } = req.session;

      const expectedAmountInGbp = (submittedData[FIELD_IDS.AMOUNT] * mockCurrencyExchangeRateResponse.exchangeRate);

      const expected = generateQuote(submittedData, expectedAmountInGbp);

      expect(req.session.quote).toEqual(expected);
    });
  });
});
