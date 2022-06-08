const controller = require('.');
const CONTENT_STRINGS = require('../../content-strings');
const { FIELD_IDS, ROUTES, TEMPLATES } = require('../../constants');
const api = require('../../api');
const mapCurrencies = require('../../helpers/map-currencies');
const generateValidationErrors = require('./validation');
const updateSubmittedData = require('../../helpers/update-submitted-data');
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
          ...CONTENT_STRINGS.TELL_US_ABOUT_YOUR_DEAL_PAGE,
        },
        BACK_LINK: ROUTES.UK_CONTENT_PERCENTAGE,
        FIELDS: {
          CREDIT_LIMIT_GROUP: {
            ID: FIELD_IDS.CREDIT_LIMIT_GROUP,
            ...CONTENT_STRINGS.FIELDS[FIELD_IDS.CREDIT_LIMIT_GROUP],
          },
          CREDIT_LIMIT_CURRENCY: {
            ID: FIELD_IDS.CREDIT_LIMIT_CURRENCY,
            ...CONTENT_STRINGS.FIELDS[FIELD_IDS.CREDIT_LIMIT_CURRENCY],
          },
          CREDIT_LIMIT: {
            ID: FIELD_IDS.CREDIT_LIMIT,
            ...CONTENT_STRINGS.FIELDS[FIELD_IDS.CREDIT_LIMIT],
          },
          PRE_CREDIT_PERIOD: {
            ID: FIELD_IDS.PRE_CREDIT_PERIOD,
            ...CONTENT_STRINGS.FIELDS[FIELD_IDS.PRE_CREDIT_PERIOD],
          },
          CREDIT_PERIOD: {
            ID: FIELD_IDS.CREDIT_PERIOD,
            ...CONTENT_STRINGS.FIELDS[FIELD_IDS.CREDIT_PERIOD],
          },
          POLICY_LENGTH: {
            ID: FIELD_IDS.POLICY_LENGTH,
            ...CONTENT_STRINGS.FIELDS[FIELD_IDS.POLICY_LENGTH],
          },
          POLICY_TYPE: {
            ID: FIELD_IDS.POLICY_TYPE,
            ...CONTENT_STRINGS.FIELDS[FIELD_IDS.POLICY_TYPE],
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

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.TELL_US_ABOUT_YOUR_DEAL, {
        ...controller.PAGE_VARIABLES,
        currencies: expectedCurrencies,
      });
    });

    describe('when a currency has been submitted', () => {
      it('should render template with currencies mapped to submitted currency and submittedValues', async () => {
        req.session.submittedData = mockAnswers;
        await controller.get(req, res);

        const expectedCurrencies = mapCurrencies(
          mockCurrenciesResponse,
          req.session.submittedData[FIELD_IDS.CREDIT_LIMIT_CURRENCY],
        );

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.TELL_US_ABOUT_YOUR_DEAL, {
          ...controller.PAGE_VARIABLES,
          currencies: expectedCurrencies,
          submittedValues: mockAnswers,
        });
      });
    });
  });

  describe('post', () => {
    const getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrenciesResponse));

    beforeEach(() => {
      api.getCurrencies = getCurrenciesSpy;
    });

    describe('when there are validation errors', () => {
      it('should call api.getCurrencies', async () => {
        await controller.get(req, res);

        expect(getCurrenciesSpy).toHaveBeenCalledTimes(1);
      });

      it('should render template with validation errors and submitted values', async () => {
        await controller.post(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.TELL_US_ABOUT_YOUR_DEAL, {
          ...controller.PAGE_VARIABLES,
          currencies: mapCurrencies(mockCurrenciesResponse, req.body[FIELD_IDS.CREDIT_LIMIT_CURRENCY]),
          validationErrors: generateValidationErrors(req.body),
          submittedValues: req.body,
        });
      });
    });

    describe('when there are no validation errors', () => {
      const validBody = {
        [FIELD_IDS.CREDIT_LIMIT_CURRENCY]: 'GBP',
        [FIELD_IDS.CREDIT_LIMIT]: '10',
        [FIELD_IDS.PRE_CREDIT_PERIOD]: '20',
        [FIELD_IDS.CREDIT_PERIOD]: '30',
        [FIELD_IDS.POLICY_LENGTH]: '40',
        [FIELD_IDS.POLICY_TYPE]: 'mock',
      };

      beforeEach(() => {
        req.body = validBody;
      });

      it('should update the session with submitted data', async () => {
        await controller.post(req, res);

        const expected = updateSubmittedData(
          req.body,
          req.session.submittedData,
        );

        expect(req.session.submittedData).toEqual(expected);
      });

      it(`should redirect to ${ROUTES.CHECK_YOUR_ANSWERS}`, async () => {
        await controller.post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.CHECK_YOUR_ANSWERS);
      });

      describe('when the url\'s last substring is `change`', () => {
        it(`should redirect to ${ROUTES.CHECK_YOUR_ANSWERS}`, () => {
          req.originalUrl = 'mock/change';

          controller.post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(ROUTES.CHECK_YOUR_ANSWERS);
        });
      });
    });
  });
});
