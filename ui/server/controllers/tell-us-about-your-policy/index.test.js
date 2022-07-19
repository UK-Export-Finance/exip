const controller = require('.');
const CONTENT_STRINGS = require('../../content-strings');
const { FIELD_IDS, ROUTES, TEMPLATES } = require('../../constants');
const api = require('../../api');
const { mapCurrencies } = require('../../helpers/map-currencies');
const generateValidationErrors = require('./validation');
const getCurrencyByCode = require('../../helpers/get-currency-by-code');
const getPercentagesOfCover = require('../../helpers/get-percentages-of-cover');
const mapPercentageOfCover = require('../../helpers/map-percentage-of-cover');
const { updateSubmittedData } = require('../../helpers/update-submitted-data');
const {
  mockReq,
  mockRes,
  mockAnswers,
  mockSession,
} = require('../../test-mocks');

describe('controllers/tell-us-about-your-policy', () => {
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

  let percentagesOfCover;
  let mappedPercentageOfCover;

  const previousFlowSubmittedData = {
    [FIELD_IDS.BUYER_COUNTRY]: mockSession.submittedData[FIELD_IDS.BUYER_COUNTRY],
    [FIELD_IDS.POLICY_TYPE]: mockSession.submittedData[FIELD_IDS.POLICY_TYPE],
    [FIELD_IDS.POLICY_LENGTH]: mockSession.submittedData[FIELD_IDS.POLICY_LENGTH],
  };

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
    req.session.submittedData = mockSession.submittedData;

    percentagesOfCover = getPercentagesOfCover(
      req.session.submittedData[FIELD_IDS.POLICY_TYPE],
      req.session.submittedData[FIELD_IDS.BUYER_COUNTRY].riskCategory,
    );

    mappedPercentageOfCover = mapPercentageOfCover(percentagesOfCover);
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
          PERCENTAGE_OF_COVER: {
            ID: FIELD_IDS.PERCENTAGE_OF_COVER,
            ...CONTENT_STRINGS.FIELDS[FIELD_IDS.PERCENTAGE_OF_COVER],
          },
          CREDIT_PERIOD: {
            ID: FIELD_IDS.CREDIT_PERIOD,
            ...CONTENT_STRINGS.FIELDS[FIELD_IDS.CREDIT_PERIOD],
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

      req.session.submittedData = {
        [FIELD_IDS.POLICY_TYPE]: mockSession.submittedData[FIELD_IDS.POLICY_TYPE],
        [FIELD_IDS.BUYER_COUNTRY]: mockSession.submittedData[FIELD_IDS.BUYER_COUNTRY],
      };

      api.getCurrencies = getCurrenciesSpy;
    });

    it('should call api.getCurrencies', async () => {
      await controller.get(req, res);

      expect(getCurrenciesSpy).toHaveBeenCalledTimes(1);
    });

    it('should render template', async () => {
      await controller.get(req, res);

      const expectedCurrencies = mapCurrencies(mockCurrenciesResponse);

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.TELL_US_ABOUT_YOUR_POLICY, {
        ...controller.PAGE_VARIABLES,
        BACK_LINK: req.headers.referer,
        currencies: expectedCurrencies,
        percentageOfCover: mappedPercentageOfCover,
        submittedValues: req.session.submittedData,
      });
    });

    describe('when a currency has been submitted', () => {
      beforeEach(() => {
        req.session.submittedData = mockSession.submittedData;
        delete req.session.submittedData[FIELD_IDS.PERCENTAGE_OF_COVER];
      });

      it('should render template with currencies mapped to submitted currency and submittedValues', async () => {
        await controller.get(req, res);

        const expectedCurrencies = mapCurrencies(
          mockCurrenciesResponse,
          req.session.submittedData[FIELD_IDS.CURRENCY].isoCode,
        );

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.TELL_US_ABOUT_YOUR_POLICY, {
          ...controller.PAGE_VARIABLES,
          BACK_LINK: req.headers.referer,
          currencies: expectedCurrencies,
          percentageOfCover: mappedPercentageOfCover,
          submittedValues: req.session.submittedData,
        });
      });
    });

    describe('when a percentage of cover has been submitted', () => {
      beforeEach(() => {
        req.session.submittedData = mockSession.submittedData;
        req.session.submittedData[FIELD_IDS.PERCENTAGE_OF_COVER] = mockAnswers[FIELD_IDS.PERCENTAGE_OF_COVER];
      });

      it('should render template with percentage of cover mapped to submitted percentage and submittedValues', async () => {
        await controller.get(req, res);

        const expectedCurrencies = mapCurrencies(
          mockCurrenciesResponse,
          req.session.submittedData[FIELD_IDS.CURRENCY].isoCode,
        );

        const mappedPercentageOfCoverWithSelected = mapPercentageOfCover(
          percentagesOfCover,
          req.session.submittedData[FIELD_IDS.PERCENTAGE_OF_COVER],
        );

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.TELL_US_ABOUT_YOUR_POLICY, {
          ...controller.PAGE_VARIABLES,
          BACK_LINK: req.headers.referer,
          currencies: expectedCurrencies,
          percentageOfCover: mappedPercentageOfCoverWithSelected,
          submittedValues: req.session.submittedData,
        });
      });
    });
  });

  describe('post', () => {
    const getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrenciesResponse));

    beforeEach(() => {
      api.getCurrencies = getCurrenciesSpy;
      req.body = mockAnswers;
      req.session.submittedData = previousFlowSubmittedData;
    });

    describe('when a currency code has been submitted', () => {
      it('should call api.getCurrencies', async () => {
        await controller.post(req, res);

        expect(getCurrenciesSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('when there are validation errors', () => {
      beforeEach(() => {
        req.body = {};
      });

      it('should render template with validation errors and submitted values', async () => {
        await controller.post(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.TELL_US_ABOUT_YOUR_POLICY, {
          ...controller.PAGE_VARIABLES,
          BACK_LINK: req.headers.referer,
          currencies: mapCurrencies(mockCurrenciesResponse),
          validationErrors: generateValidationErrors(req.body),
          percentageOfCover: mappedPercentageOfCover,
          submittedValues: req.body,
        });
      });

      describe('when a currency code has been submitted', () => {
        beforeEach(() => {
          req.session.submittedData = previousFlowSubmittedData;
          req.body[FIELD_IDS.CURRENCY] = mockAnswers[FIELD_IDS.CURRENCY];
        });

        it('should render template with mapped submitted currency', async () => {
          await controller.post(req, res);

          expect(res.render).toHaveBeenCalledWith(TEMPLATES.TELL_US_ABOUT_YOUR_POLICY, {
            ...controller.PAGE_VARIABLES,
            BACK_LINK: req.headers.referer,
            currencies: mapCurrencies(mockCurrenciesResponse, req.body[FIELD_IDS.CURRENCY]),
            validationErrors: generateValidationErrors(req.body),
            percentageOfCover: mappedPercentageOfCover,
            submittedValues: req.body,
          });
        });
      });

      describe('when a percentage of cover has been submitted', () => {
        beforeEach(() => {
          req.body[FIELD_IDS.PERCENTAGE_OF_COVER] = mockAnswers[FIELD_IDS.PERCENTAGE_OF_COVER];
        });

        it('should render template with mapped submitted percentage', async () => {
          await controller.post(req, res);

          const mappedPercentageOfCoverWithSelected = mapPercentageOfCover(
            percentagesOfCover,
            req.body[FIELD_IDS.PERCENTAGE_OF_COVER],
          );

          expect(res.render).toHaveBeenCalledWith(TEMPLATES.TELL_US_ABOUT_YOUR_POLICY, {
            ...controller.PAGE_VARIABLES,
            BACK_LINK: req.headers.referer,
            currencies: mapCurrencies(mockCurrenciesResponse, req.body[FIELD_IDS.CURRENCY]),
            validationErrors: generateValidationErrors(req.body),
            percentageOfCover: mappedPercentageOfCoverWithSelected,
            submittedValues: req.body,
          });
        });
      });
    });

    describe('when there are no validation errors', () => {
      const validBody = {
        [FIELD_IDS.CURRENCY]: mockAnswers[FIELD_IDS.CURRENCY],
        [FIELD_IDS.AMOUNT]: '10',
        [FIELD_IDS.CREDIT_PERIOD]: '2',
        [FIELD_IDS.POLICY_LENGTH]: '40',
        [FIELD_IDS.POLICY_TYPE]: 'mock',
        [FIELD_IDS.PERCENTAGE_OF_COVER]: '95',
      };

      beforeEach(() => {
        req.body = validBody;
      });

      it('should update the session with submitted data, popluated with full currency object', async () => {
        await controller.post(req, res);

        const expectedPopulatedData = {
          ...validBody,
          [FIELD_IDS.CURRENCY]: getCurrencyByCode(
            mockCurrenciesResponse,
            validBody[FIELD_IDS.CURRENCY],
          ),
          [FIELD_IDS.PERCENTAGE_OF_COVER]: validBody[FIELD_IDS.PERCENTAGE_OF_COVER],
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
