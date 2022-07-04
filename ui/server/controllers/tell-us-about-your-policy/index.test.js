const controller = require('.');
const CONTENT_STRINGS = require('../../content-strings');
const { FIELD_IDS, ROUTES, TEMPLATES } = require('../../constants');
const api = require('../../api');
const { mapCurrencies } = require('../../helpers/map-currencies');
const generateValidationErrors = require('./validation');
const getCurrencyByCode = require('../../helpers/get-currency-by-code');
const { updateSubmittedData } = require('../../helpers/update-submitted-data');
const mapSubmittedValues = require('../../helpers/map-submitted-values');
const { mockReq, mockRes, mockAnswers } = require('../../test-mocks');

describe('controllers/buyer-based', () => {
  let req;
  let res;
  const mockCurrenciesResponse = [
    {
      name: 'Euros',
      isoCode: 'EUR',
    },
    {
      name: 'Hong Kong Dollars',
      isoCode: 'HKD',
    },
    {
      name: 'UK Sterling',
      isoCode: 'GBP',
    },
  ];

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
    req.session.submittedData = mockAnswers;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        CONTENT_STRINGS: {
          PRODUCT: CONTENT_STRINGS.PRODUCT,
          FOOTER: CONTENT_STRINGS.FOOTER,
          BUTTONS: CONTENT_STRINGS.BUTTONS,
          ...CONTENT_STRINGS.PAGES.TELL_US_ABOUT_YOUR_POLICY_PAGE,
        },
        FIELDS: {
          AMOUNT_CURRENCY: {
            ID: FIELD_IDS.AMOUNT_CURRENCY,
            ...CONTENT_STRINGS.FIELDS[FIELD_IDS.AMOUNT_CURRENCY],
          },
          CURRENCY: {
            ID: FIELD_IDS.CURRENCY,
            ...CONTENT_STRINGS.FIELDS[FIELD_IDS.CURRENCY],
          },
          AMOUNT: {
            ID: FIELD_IDS.AMOUNT,
            ...CONTENT_STRINGS.FIELDS[FIELD_IDS.AMOUNT],
          },
          CREDIT_PERIOD: {
            ID: FIELD_IDS.CREDIT_PERIOD,
            ...CONTENT_STRINGS.FIELDS[FIELD_IDS.CREDIT_PERIOD],
          },
          POLICY_TYPE: {
            ID: FIELD_IDS.POLICY_TYPE,
            ...CONTENT_STRINGS.FIELDS[FIELD_IDS.POLICY_TYPE],
          },
          SINGLE_POLICY_TYPE: {
            ID: FIELD_IDS.SINGLE_POLICY_TYPE,
            ...CONTENT_STRINGS.FIELDS[FIELD_IDS.POLICY_TYPE],
          },
          SINGLE_POLICY_LENGTH: {
            ID: FIELD_IDS.SINGLE_POLICY_LENGTH,
            ...CONTENT_STRINGS.FIELDS[FIELD_IDS.SINGLE_POLICY_LENGTH],
          },
          MULTI_POLICY_LENGTH: {
            ID: FIELD_IDS.MULTI_POLICY_LENGTH,
            ...CONTENT_STRINGS.FIELDS[FIELD_IDS.MULTI_POLICY_LENGTH],
          },
        },
      };

      expect(controller.PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('get', () => {
    const getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrenciesResponse));

    beforeEach(() => {
      delete req.session.submittedData;
      api.getCurrencies = getCurrenciesSpy;
    });

    it('should call api.getCurrencies', async () => {
      await controller.get(req, res);

      expect(getCurrenciesSpy).toHaveBeenCalledTimes(1);
    });

    it('should render template', async () => {
      await controller.get(req, res);

      const expectedCurrencies = mapCurrencies(
        mockCurrenciesResponse,
      );

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.TELL_US_ABOUT_YOUR_POLICY, {
        ...controller.PAGE_VARIABLES,
        BACK_LINK: req.headers.referer,
        currencies: expectedCurrencies,
      });
    });

    describe('when a currency has been submitted', () => {
      it('should render template with currencies mapped to submitted currency and submittedValues', async () => {
        req.session.submittedData = mockAnswers;
        await controller.get(req, res);

        const expectedCurrencies = mapCurrencies(
          mockCurrenciesResponse,
          req.session.submittedData[FIELD_IDS.CURRENCY].isoCode,
        );

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.TELL_US_ABOUT_YOUR_POLICY, {
          ...controller.PAGE_VARIABLES,
          BACK_LINK: req.headers.referer,
          currencies: expectedCurrencies,
          submittedValues: mapSubmittedValues(mockAnswers),
        });
      });
    });
  });

  describe('post', () => {
    const getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrenciesResponse));

    beforeEach(() => {
      api.getCurrencies = getCurrenciesSpy;
    });

    describe('when a currency code has been submitted', () => {
      it('should call api.getCurrencies', async () => {
        req.body[FIELD_IDS.CURRENCY] = mockAnswers[FIELD_IDS.CURRENCY];
        await controller.post(req, res);

        expect(getCurrenciesSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('when there are validation errors', () => {
      it('should render template with validation errors and submitted values', async () => {
        await controller.post(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.TELL_US_ABOUT_YOUR_POLICY, {
          ...controller.PAGE_VARIABLES,
          BACK_LINK: req.headers.referer,
          currencies: mapCurrencies(mockCurrenciesResponse),
          validationErrors: generateValidationErrors(req.body),
          submittedValues: req.body,
        });
      });

      describe('when a currency code has been submitted', () => {
        it('should render template with mapped submitted currency', async () => {
          req.body[FIELD_IDS.CURRENCY] = mockAnswers[FIELD_IDS.CURRENCY];
          await controller.post(req, res);

          expect(res.render).toHaveBeenCalledWith(TEMPLATES.TELL_US_ABOUT_YOUR_POLICY, {
            ...controller.PAGE_VARIABLES,
            BACK_LINK: req.headers.referer,
            currencies: mapCurrencies(mockCurrenciesResponse, req.body[FIELD_IDS.CURRENCY]),
            validationErrors: generateValidationErrors(req.body),
            submittedValues: req.body,
          });
        });
      });
    });

    describe('when there are no validation errors', () => {
      const validBody = {
        [FIELD_IDS.CURRENCY]: mockAnswers[FIELD_IDS.CURRENCY],
        [FIELD_IDS.AMOUNT]: '10',
        [FIELD_IDS.CREDIT_PERIOD]: '30',
        [FIELD_IDS.POLICY_LENGTH]: '40',
        [FIELD_IDS.POLICY_TYPE]: 'mock',
      };

      beforeEach(() => {
        req.body = validBody;
      });

      it('should update the session with submitted data, popluated with full currency object', async () => {
        await controller.post(req, res);

        const expectedPopulatedData = {
          ...validBody,
          [FIELD_IDS.CURRENCY]: getCurrencyByCode(mockCurrenciesResponse, mockAnswers[FIELD_IDS.CURRENCY]),
        };
        const expected = updateSubmittedData(
          expectedPopulatedData,
          req.session.submittedData,
        );

        expect(req.session.submittedData).toEqual(expected);
      });

      it(`should redirect to ${ROUTES.CHECK_YOUR_ANSWERS}`, async () => {
        await controller.post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.CHECK_YOUR_ANSWERS);
      });

      describe('when the url\'s last substring is `change`', () => {
        it(`should redirect to ${ROUTES.CHECK_YOUR_ANSWERS}`, async () => {
          req.originalUrl = 'mock/change';

          await controller.post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(ROUTES.CHECK_YOUR_ANSWERS);
        });
      });
    });
  });
});
