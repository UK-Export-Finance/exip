import { FIELD_IDS, generatePageVariables, TEMPLATE, get, post } from '.';
import { FIELDS, PAGES } from '../../../content-strings';
import { FIELD_IDS as ALL_FIELD_IDS, FIELD_VALUES, PERCENTAGES_OF_COVER, ROUTES, TEMPLATES } from '../../../constants';
import api from '../../../api';
import mapCurrenciesAsSelectOptions from '../../../helpers/mappings/map-currencies/as-select-options';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import corePageVariables from '../../../helpers/page-variables/core';
import constructPayload from '../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import getCurrencyByCode from '../../../helpers/get-currency-by-code';
import mapPercentageOfCover from '../../../helpers/mappings/map-percentage-of-cover';
import mapCreditPeriod from '../../../helpers/mappings/map-credit-period';
import { updateSubmittedData } from '../../../helpers/update-submitted-data/quote';
import { isSinglePolicyType, isMultiplePolicyType } from '../../../helpers/policy-type';
import { mockReq, mockRes, mockAnswers, mockCurrencies, mockCurrenciesResponse, mockCurrenciesEmptyResponse, mockSession } from '../../../test-mocks';
import { Request, Response, SelectOption } from '../../../../types';

const {
  ELIGIBILITY: { BUYER_COUNTRY, AMOUNT_CURRENCY, CONTRACT_VALUE, CREDIT_PERIOD, CURRENCY, MAX_AMOUNT_OWED, PERCENTAGE_OF_COVER },
  POLICY_TYPE,
  POLICY_LENGTH,
} = ALL_FIELD_IDS;

describe('controllers/quote/tell-us-about-your-policy', () => {
  let req: Request;
  let res: Response;

  let mappedPercentageOfCover: Array<object>;
  const creditPeriodOptions = FIELDS[CREDIT_PERIOD].OPTIONS as Array<SelectOption>;
  let mappedCreditPeriod: Array<SelectOption>;

  const previousFlowSubmittedData = {
    [BUYER_COUNTRY]: mockSession.submittedData.quoteEligibility[BUYER_COUNTRY],
    [CONTRACT_VALUE]: mockSession.submittedData.quoteEligibility[CONTRACT_VALUE],
    [POLICY_TYPE]: mockSession.submittedData.quoteEligibility[POLICY_TYPE],
  };

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
    req.session.submittedData = mockSession.submittedData;

    mappedPercentageOfCover = mapPercentageOfCover(PERCENTAGES_OF_COVER);
    mappedCreditPeriod = mapCreditPeriod(creditPeriodOptions);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('FIELD_IDS', () => {
    it('should have the correct FIELD_IDS', () => {
      const expected = [AMOUNT_CURRENCY, CONTRACT_VALUE, CREDIT_PERIOD, CURRENCY, MAX_AMOUNT_OWED, PERCENTAGE_OF_COVER, POLICY_LENGTH];

      expect(FIELD_IDS).toEqual(expected);
    });
  });

  describe('generatePageVariables', () => {
    describe('when policy type is single', () => {
      it('should return page variables with single policy strings', () => {
        const result = generatePageVariables(FIELD_VALUES.POLICY_TYPE.SINGLE);

        const expected = {
          PAGE_TITLE: PAGES.QUOTE.TELL_US_ABOUT_YOUR_POLICY.SINGLE_POLICY_PAGE_TITLE,
          FIELDS: {
            AMOUNT_CURRENCY: {
              ID: AMOUNT_CURRENCY,
              ...FIELDS[AMOUNT_CURRENCY].SINGLE_POLICY,
            },
            CURRENCY: {
              ID: CURRENCY,
              ...FIELDS[CURRENCY],
            },
            PERCENTAGE_OF_COVER: {
              ID: PERCENTAGE_OF_COVER,
              ...FIELDS[PERCENTAGE_OF_COVER].SINGLE_POLICY,
            },
            POLICY_LENGTH: {
              ID: POLICY_LENGTH,
              ...FIELDS[POLICY_LENGTH],
            },
            CONTRACT_VALUE: {
              ID: CONTRACT_VALUE,
              ...FIELDS[CONTRACT_VALUE],
            },
            MAX_AMOUNT_OWED: {},
            CREDIT_PERIOD: {},
          },
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when policy type is multiple', () => {
      it('should return page variables with multiple policy strings', () => {
        const result = generatePageVariables(FIELD_VALUES.POLICY_TYPE.MULTIPLE);

        const expected = {
          PAGE_TITLE: PAGES.QUOTE.TELL_US_ABOUT_YOUR_POLICY.MULTIPLE_POLICY_PAGE_TITLE,
          FIELDS: {
            AMOUNT_CURRENCY: {
              ID: AMOUNT_CURRENCY,
              ...FIELDS[AMOUNT_CURRENCY].MULTIPLE_POLICY,
            },
            CURRENCY: {
              ID: CURRENCY,
              ...FIELDS[CURRENCY],
            },
            PERCENTAGE_OF_COVER: {
              ID: PERCENTAGE_OF_COVER,
              ...FIELDS[PERCENTAGE_OF_COVER].MULTIPLE_POLICY,
            },
            POLICY_LENGTH: {},
            CONTRACT_VALUE: {},
            MAX_AMOUNT_OWED: {
              ID: MAX_AMOUNT_OWED,
              ...FIELDS[MAX_AMOUNT_OWED],
            },
            CREDIT_PERIOD: {
              ID: CREDIT_PERIOD,
              ...FIELDS[CREDIT_PERIOD],
            },
          },
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when policy type is not recognised', () => {
      it('should return base page variables', () => {
        const result = generatePageVariables('');

        const expected = {
          PAGE_TITLE: '',
          FIELDS: {
            AMOUNT_CURRENCY: {},
            CURRENCY: {
              ID: CURRENCY,
              ...FIELDS[CURRENCY],
            },
            PERCENTAGE_OF_COVER: {},
            POLICY_LENGTH: {},
            CONTRACT_VALUE: {},
            MAX_AMOUNT_OWED: {},
            CREDIT_PERIOD: {},
          },
        };

        expect(result).toEqual(expected);
      });
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.QUOTE.TELL_US_ABOUT_YOUR_POLICY);
    });
  });

  describe('get', () => {
    let getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrenciesResponse));

    beforeEach(() => {
      req.session.submittedData = {
        quoteEligibility: {
          [POLICY_TYPE]: mockSession.submittedData.quoteEligibility[POLICY_TYPE],
          [BUYER_COUNTRY]: mockSession.submittedData.quoteEligibility[BUYER_COUNTRY],
        },
        insuranceEligibility: {},
      };

      api.keystone.APIM.getCurrencies = getCurrenciesSpy;
    });

    it('should call api.keystone.APIM.getCurrencies', async () => {
      await get(req, res);

      expect(getCurrenciesSpy).toHaveBeenCalledTimes(1);
    });

    it('should render template', async () => {
      await get(req, res);

      const policyType = req.session.submittedData.quoteEligibility[POLICY_TYPE];

      const PAGE_VARIABLES = generatePageVariables(policyType);

      const expectedCurrencies = mapCurrenciesAsSelectOptions(mockCurrencies);

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.QUOTE.TELL_US_ABOUT_YOUR_POLICY, {
        userName: getUserNameFromSession(req.session.user),
        ...corePageVariables({
          PAGE_CONTENT_STRINGS: {
            ...PAGES.QUOTE.TELL_US_ABOUT_YOUR_POLICY,
            PAGE_TITLE: PAGE_VARIABLES.PAGE_TITLE,
          },
          BACK_LINK: req.headers.referer,
          ORIGINAL_URL: req.originalUrl,
        }),
        ...generatePageVariables(policyType),
        isSinglePolicyType: isSinglePolicyType(policyType),
        isMultiplePolicyType: isMultiplePolicyType(policyType),
        currencies: expectedCurrencies,
        percentageOfCover: mappedPercentageOfCover,
        creditPeriod: mappedCreditPeriod,
        submittedValues: req.session.submittedData.quoteEligibility,
      });
    });

    describe('when a currency has been submitted', () => {
      beforeEach(() => {
        req.session.submittedData = mockSession.submittedData;
        delete req.session.submittedData.quoteEligibility[PERCENTAGE_OF_COVER];
        delete req.session.submittedData.quoteEligibility[CREDIT_PERIOD];
      });

      it('should render template with currencies mapped to submitted currency and submittedValues', async () => {
        await get(req, res);

        const policyType = req.session.submittedData.quoteEligibility[POLICY_TYPE];

        const PAGE_VARIABLES = generatePageVariables(policyType);

        const expectedCurrencies = mapCurrenciesAsSelectOptions(mockCurrencies, req.session.submittedData.quoteEligibility[CURRENCY].isoCode);

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.QUOTE.TELL_US_ABOUT_YOUR_POLICY, {
          userName: getUserNameFromSession(req.session.user),
          ...corePageVariables({
            PAGE_CONTENT_STRINGS: {
              ...PAGES.QUOTE.TELL_US_ABOUT_YOUR_POLICY,
              PAGE_TITLE: PAGE_VARIABLES.PAGE_TITLE,
            },
            BACK_LINK: req.headers.referer,
            ORIGINAL_URL: req.originalUrl,
          }),
          ...generatePageVariables(policyType),
          BACK_LINK: req.headers.referer,
          isSinglePolicyType: isSinglePolicyType(policyType),
          isMultiplePolicyType: isMultiplePolicyType(policyType),
          currencies: expectedCurrencies,
          percentageOfCover: mappedPercentageOfCover,
          creditPeriod: mappedCreditPeriod,
          submittedValues: req.session.submittedData.quoteEligibility,
        });
      });
    });

    describe('when a percentage of cover has been submitted', () => {
      beforeEach(() => {
        req.session.submittedData = mockSession.submittedData;
        req.session.submittedData.quoteEligibility[PERCENTAGE_OF_COVER] = mockAnswers[PERCENTAGE_OF_COVER];
        delete req.session.submittedData.quoteEligibility[CREDIT_PERIOD];
      });

      it('should render template with percentage of cover mapped to submitted percentage and submittedValues', async () => {
        await get(req, res);

        const policyType = req.session.submittedData.quoteEligibility[POLICY_TYPE];

        const PAGE_VARIABLES = generatePageVariables(policyType);

        const expectedCurrencies = mapCurrenciesAsSelectOptions(mockCurrencies, req.session.submittedData.quoteEligibility[CURRENCY].isoCode);

        const mappedPercentageOfCoverWithSelected = mapPercentageOfCover(PERCENTAGES_OF_COVER, req.session.submittedData.quoteEligibility[PERCENTAGE_OF_COVER]);

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.QUOTE.TELL_US_ABOUT_YOUR_POLICY, {
          userName: getUserNameFromSession(req.session.user),
          ...corePageVariables({
            PAGE_CONTENT_STRINGS: {
              ...PAGES.QUOTE.TELL_US_ABOUT_YOUR_POLICY,
              PAGE_TITLE: PAGE_VARIABLES.PAGE_TITLE,
            },
            BACK_LINK: req.headers.referer,
            ORIGINAL_URL: req.originalUrl,
          }),
          ...generatePageVariables(policyType),
          isSinglePolicyType: isSinglePolicyType(policyType),
          isMultiplePolicyType: isMultiplePolicyType(policyType),
          currencies: expectedCurrencies,
          percentageOfCover: mappedPercentageOfCoverWithSelected,
          creditPeriod: mappedCreditPeriod,
          submittedValues: req.session.submittedData.quoteEligibility,
        });
      });
    });

    describe('when a credit period has been submitted', () => {
      beforeEach(() => {
        req.session.submittedData = mockSession.submittedData;
        // @ts-ignore
        req.session.submittedData.quoteEligibility[CREDIT_PERIOD] = 2;
      });

      it('should render template with credit period mapped to submitted credit period and submittedValues', async () => {
        await get(req, res);

        const policyType = req.session.submittedData.quoteEligibility[POLICY_TYPE];

        const PAGE_VARIABLES = generatePageVariables(policyType);

        const expectedCurrencies = mapCurrenciesAsSelectOptions(mockCurrencies, req.session.submittedData.quoteEligibility[CURRENCY].isoCode);

        const mappedPercentageOfCoverWithSelected = mapPercentageOfCover(PERCENTAGES_OF_COVER, req.session.submittedData.quoteEligibility[PERCENTAGE_OF_COVER]);

        const mappedCreditPeriodWithSelected = mapCreditPeriod(creditPeriodOptions, String(req.session.submittedData.quoteEligibility[CREDIT_PERIOD]));

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.QUOTE.TELL_US_ABOUT_YOUR_POLICY, {
          userName: getUserNameFromSession(req.session.user),
          ...corePageVariables({
            PAGE_CONTENT_STRINGS: {
              ...PAGES.QUOTE.TELL_US_ABOUT_YOUR_POLICY,
              PAGE_TITLE: PAGE_VARIABLES.PAGE_TITLE,
            },
            BACK_LINK: req.headers.referer,
            ORIGINAL_URL: req.originalUrl,
          }),
          ...generatePageVariables(policyType),
          isSinglePolicyType: isSinglePolicyType(policyType),
          isMultiplePolicyType: isMultiplePolicyType(policyType),
          currencies: expectedCurrencies,
          percentageOfCover: mappedPercentageOfCoverWithSelected,
          creditPeriod: mappedCreditPeriodWithSelected,
          submittedValues: req.session.submittedData.quoteEligibility,
        });
      });
    });

    describe('api error handling', () => {
      describe('when the get currencies API call fails', () => {
        beforeEach(() => {
          getCurrenciesSpy = jest.fn(() => Promise.reject(new Error('mock')));
          api.keystone.APIM.getCurrencies = getCurrenciesSpy;
        });

        it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
          await get(req, res);
          expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
        });
      });

      describe('when the get currencies response does not return a populated array', () => {
        beforeEach(() => {
          getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrenciesEmptyResponse));
          api.keystone.APIM.getCurrencies = getCurrenciesSpy;
        });

        it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
          await get(req, res);
          expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
        });
      });
    });
  });

  describe('post', () => {
    let getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrenciesResponse));

    beforeEach(() => {
      api.keystone.APIM.getCurrencies = getCurrenciesSpy;
      req.body = mockAnswers;
      req.session.submittedData = {
        quoteEligibility: previousFlowSubmittedData,
        insuranceEligibility: {},
      };
    });

    describe('when a currency code has been submitted', () => {
      it('should call api.keystone.APIM.getCurrencies', async () => {
        await post(req, res);

        expect(getCurrenciesSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('when there are validation errors', () => {
      beforeEach(() => {
        req.body = {};
      });

      it('should render template with validation errors and submitted values from constructPayload function', async () => {
        await post(req, res);

        const policyType = req.session.submittedData.quoteEligibility[POLICY_TYPE];

        const PAGE_VARIABLES = generatePageVariables(policyType);

        const payload = constructPayload(req.body, FIELD_IDS);

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.QUOTE.TELL_US_ABOUT_YOUR_POLICY, {
          userName: getUserNameFromSession(req.session.user),
          ...corePageVariables({
            PAGE_CONTENT_STRINGS: {
              ...PAGES.QUOTE.TELL_US_ABOUT_YOUR_POLICY,
              PAGE_TITLE: PAGE_VARIABLES.PAGE_TITLE,
            },
            BACK_LINK: req.headers.referer,
            ORIGINAL_URL: req.originalUrl,
          }),
          ...generatePageVariables(policyType),
          isSinglePolicyType: isSinglePolicyType(policyType),
          isMultiplePolicyType: isMultiplePolicyType(policyType),
          currencies: mapCurrenciesAsSelectOptions(mockCurrencies),
          validationErrors: generateValidationErrors({
            ...req.session.submittedData.quoteEligibility,
            ...payload,
          }),
          percentageOfCover: mappedPercentageOfCover,
          creditPeriod: mappedCreditPeriod,
          submittedValues: payload,
        });
      });

      describe('when a currency code has been submitted', () => {
        beforeEach(() => {
          req.session.submittedData = {
            quoteEligibility: previousFlowSubmittedData,
            insuranceEligibility: {},
          };
          req.body[CURRENCY] = mockAnswers[CURRENCY];
        });

        it('should render template with mapped submitted currency from constructPayload function', async () => {
          await post(req, res);

          const policyType = req.session.submittedData.quoteEligibility[POLICY_TYPE];

          const PAGE_VARIABLES = generatePageVariables(policyType);

          const payload = constructPayload(req.body, FIELD_IDS);

          expect(res.render).toHaveBeenCalledWith(TEMPLATES.QUOTE.TELL_US_ABOUT_YOUR_POLICY, {
            userName: getUserNameFromSession(req.session.user),
            ...corePageVariables({
              PAGE_CONTENT_STRINGS: {
                ...PAGES.QUOTE.TELL_US_ABOUT_YOUR_POLICY,
                PAGE_TITLE: PAGE_VARIABLES.PAGE_TITLE,
              },
              BACK_LINK: req.headers.referer,
              ORIGINAL_URL: req.originalUrl,
            }),
            ...generatePageVariables(policyType),
            isSinglePolicyType: isSinglePolicyType(policyType),
            isMultiplePolicyType: isMultiplePolicyType(policyType),
            currencies: mapCurrenciesAsSelectOptions(mockCurrencies, payload[CURRENCY]),
            validationErrors: generateValidationErrors({
              ...req.session.submittedData.quoteEligibility,
              ...payload,
            }),
            percentageOfCover: mappedPercentageOfCover,
            creditPeriod: mappedCreditPeriod,
            submittedValues: payload,
          });
        });
      });

      describe('when a percentage of cover has been submitted', () => {
        beforeEach(() => {
          req.body[PERCENTAGE_OF_COVER] = mockAnswers[PERCENTAGE_OF_COVER];
        });

        it('should render template with mapped submitted percentage', async () => {
          await post(req, res);

          const submittedPercentageOfCover = Number(req.body[PERCENTAGE_OF_COVER]);
          const mappedPercentageOfCoverWithSelected = mapPercentageOfCover(PERCENTAGES_OF_COVER, submittedPercentageOfCover);

          const policyType = req.session.submittedData.quoteEligibility[POLICY_TYPE];

          const PAGE_VARIABLES = generatePageVariables(policyType);

          const payload = constructPayload(req.body, FIELD_IDS);

          expect(res.render).toHaveBeenCalledWith(TEMPLATES.QUOTE.TELL_US_ABOUT_YOUR_POLICY, {
            userName: getUserNameFromSession(req.session.user),
            ...corePageVariables({
              PAGE_CONTENT_STRINGS: {
                ...PAGES.QUOTE.TELL_US_ABOUT_YOUR_POLICY,
                PAGE_TITLE: PAGE_VARIABLES.PAGE_TITLE,
              },
              BACK_LINK: req.headers.referer,
              ORIGINAL_URL: req.originalUrl,
            }),
            ...generatePageVariables(policyType),
            isSinglePolicyType: isSinglePolicyType(req.session.submittedData.quoteEligibility[POLICY_TYPE]),
            isMultiplePolicyType: isMultiplePolicyType(req.session.submittedData.quoteEligibility[POLICY_TYPE]),
            currencies: mapCurrenciesAsSelectOptions(mockCurrencies, payload[CURRENCY]),
            validationErrors: generateValidationErrors({
              ...req.session.submittedData.quoteEligibility,
              ...payload,
            }),
            percentageOfCover: mappedPercentageOfCoverWithSelected,
            creditPeriod: mappedCreditPeriod,
            submittedValues: payload,
          });
        });
      });

      describe('when a credit period has been submitted', () => {
        beforeEach(() => {
          req.body[CREDIT_PERIOD] = mockAnswers[CREDIT_PERIOD];
        });

        it('should render template with mapped submitted credit period from constructPayload function', async () => {
          await post(req, res);

          const policyType = req.session.submittedData.quoteEligibility[POLICY_TYPE];

          const PAGE_VARIABLES = generatePageVariables(policyType);

          const payload = constructPayload(req.body, FIELD_IDS);

          const mappedCreditPeriodWithSelected = mapCreditPeriod(creditPeriodOptions, String(req.session.submittedData.quoteEligibility[CREDIT_PERIOD]));

          expect(res.render).toHaveBeenCalledWith(TEMPLATES.QUOTE.TELL_US_ABOUT_YOUR_POLICY, {
            userName: getUserNameFromSession(req.session.user),
            ...corePageVariables({
              PAGE_CONTENT_STRINGS: {
                ...PAGES.QUOTE.TELL_US_ABOUT_YOUR_POLICY,
                PAGE_TITLE: PAGE_VARIABLES.PAGE_TITLE,
              },
              BACK_LINK: req.headers.referer,
              ORIGINAL_URL: req.originalUrl,
            }),
            ...generatePageVariables(policyType),
            isSinglePolicyType: isSinglePolicyType(policyType),
            isMultiplePolicyType: isMultiplePolicyType(policyType),
            currencies: mapCurrenciesAsSelectOptions(mockCurrencies, payload[CURRENCY]),
            validationErrors: generateValidationErrors({
              ...req.session.submittedData.quoteEligibility,
              ...payload,
            }),
            percentageOfCover: mappedPercentageOfCover,
            creditPeriod: mappedCreditPeriodWithSelected,
            submittedValues: payload,
          });
        });
      });
    });

    describe('when there are no validation errors', () => {
      const validBody = {
        [CURRENCY]: mockAnswers[CURRENCY],
        [CONTRACT_VALUE]: '10',
        [POLICY_LENGTH]: '5',
        [PERCENTAGE_OF_COVER]: '95',
      };

      beforeEach(() => {
        req.body = validBody;
      });

      it('should update the session with submitted data, populated with full currency object from constructPayload function', async () => {
        await post(req, res);

        const payload = constructPayload(validBody, FIELD_IDS);

        const expectedPopulatedData = {
          ...payload,
          [CURRENCY]: getCurrencyByCode(mockCurrencies, validBody[CURRENCY]),
        };

        const expected = updateSubmittedData(expectedPopulatedData, req.session.submittedData.quoteEligibility);

        expect(req.session.submittedData.quoteEligibility).toEqual(expected);
      });

      it(`should redirect to ${ROUTES.QUOTE.CHECK_YOUR_ANSWERS}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
      });

      describe("when the url's last substring is `change`", () => {
        it(`should redirect to ${ROUTES.QUOTE.CHECK_YOUR_ANSWERS}`, async () => {
          req.originalUrl = 'mock/change';

          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
        });
      });
    });

    describe('api error handling', () => {
      describe('when the get currencies API call fails', () => {
        beforeEach(() => {
          getCurrenciesSpy = jest.fn(() => Promise.reject(new Error('mock')));
          api.keystone.APIM.getCurrencies = getCurrenciesSpy;
        });

        it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);
          expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
        });
      });

      describe('when the get currencies response does not return a populated array', () => {
        beforeEach(() => {
          getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrenciesEmptyResponse));
          api.keystone.APIM.getCurrencies = getCurrenciesSpy;
        });

        it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);
          expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
        });
      });
    });
  });
});
