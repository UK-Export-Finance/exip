import { pageVariables, TEMPLATE, FIELD_IDS, totalMonthsOfCoverOptions, get, post } from '.';
import { GBP_CURRENCY_CODE, TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { PAGES } from '../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import api from '../../../../api';
import mapRadioAndSelectOptions from '../../../../helpers/mappings/map-currencies/radio-and-select-options';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import generateValidationErrors from './validation';
import mapAndSave from '../map-and-save/policy';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockCurrenciesResponse } from '../../../../test-mocks';
import { mockApplicationMultiplePolicy as mockApplication } from '../../../../test-mocks/mock-application';

const {
  INSURANCE_ROOT,
  POLICY: {
    MULTIPLE_CONTRACT_POLICY_SAVE_AND_BACK,
    MULTIPLE_CONTRACT_POLICY_CHANGE,
    MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE,
    MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE,
    MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_CHANGE,
    MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_CHECK_AND_CHANGE,
    CHECK_YOUR_ANSWERS,
  },
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const {
  CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE },
  POLICY: {
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
      REQUESTED_START_DATE_DAY,
      REQUESTED_START_DATE_MONTH,
      REQUESTED_START_DATE_YEAR,
      MULTIPLE: { TOTAL_MONTHS_OF_COVER },
      POLICY_CURRENCY_CODE,
    },
    EXPORT_VALUE: {
      MULTIPLE: { TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
    },
  },
} = INSURANCE_FIELD_IDS;

const applicationWithTotalSalesAndMaximumWillOwe = {
  ...mockApplication,
  policy: {
    ...mockApplication.policy,
    [TOTAL_SALES_TO_BUYER]: '1234',
    [MAXIMUM_BUYER_WILL_OWE]: '5678',
  },
};

const applicationWithoutTotalSalesAndMaximumWillOwe = {
  ...mockApplication,
  policy: {
    ...mockApplication.policy,
    [TOTAL_SALES_TO_BUYER]: null,
    [MAXIMUM_BUYER_WILL_OWE]: null,
  },
};

const { supportedCurrencies, alternativeCurrencies } = mockCurrenciesResponse;

const currencyAnswer = mockApplication.policy[POLICY_CURRENCY_CODE];

describe('controllers/insurance/policy/multiple-contract-policy', () => {
  let req: Request;
  let res: Response;
  let refNumber: number;

  jest.mock('../map-and-save/policy');

  mapAndSave.policy = jest.fn(() => Promise.resolve(true));
  let getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrenciesResponse));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplication;
    req.params.referenceNumber = String(mockApplication.referenceNumber);
    refNumber = Number(mockApplication.referenceNumber);
    api.keystone.APIM.getCurrencies = getCurrenciesSpy;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(refNumber);

      const expected = {
        FIELDS: {
          REQUESTED_START_DATE: {
            ID: REQUESTED_START_DATE,
            ...FIELDS.CONTRACT_POLICY[REQUESTED_START_DATE],
          },
          TOTAL_MONTHS_OF_COVER: {
            ID: TOTAL_MONTHS_OF_COVER,
            ...FIELDS.CONTRACT_POLICY.MULTIPLE[TOTAL_MONTHS_OF_COVER],
          },
          CURRENCY_CODE: {
            ID: CURRENCY_CODE,
            ...FIELDS.CONTRACT_POLICY[CURRENCY_CODE],
          },
          ALTERNATIVE_CURRENCY_CODE: {
            ID: ALTERNATIVE_CURRENCY_CODE,
          },
        },
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${req.params.referenceNumber}${MULTIPLE_CONTRACT_POLICY_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.POLICY.MULTIPLE_CONTRACT_POLICY);
    });
  });

  describe('totalMonthsOfCoverOptions', () => {
    it('should have the correct array of months', () => {
      const expected = FIELDS.CONTRACT_POLICY.MULTIPLE[TOTAL_MONTHS_OF_COVER].OPTIONS;

      expect(totalMonthsOfCoverOptions).toEqual(expected);
    });
  });

  describe('FIELD_IDS', () => {
    it('should have the correct FIELD_IDS', () => {
      const expected = [
        REQUESTED_START_DATE_DAY,
        REQUESTED_START_DATE_MONTH,
        REQUESTED_START_DATE_YEAR,
        TOTAL_MONTHS_OF_COVER,
        POLICY_CURRENCY_CODE,
        CURRENCY_CODE,
        ALTERNATIVE_CURRENCY_CODE,
      ];

      expect(FIELD_IDS).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should call api.keystone.APIM.getCurrencies', async () => {
      await get(req, res);

      expect(getCurrenciesSpy).toHaveBeenCalledTimes(1);
    });

    it('should render template', async () => {
      await get(req, res);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY.MULTIPLE_CONTRACT_POLICY,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(refNumber),
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(mockApplication),
        ...mapRadioAndSelectOptions(alternativeCurrencies, supportedCurrencies, currencyAnswer),
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        delete res.locals.application;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('api error handling', () => {
      describe('when the get currencies API call fails', () => {
        beforeEach(() => {
          getCurrenciesSpy = jest.fn(() => Promise.reject(new Error('mock')));
          api.keystone.APIM.getCurrencies = getCurrenciesSpy;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });

      describe('when the get currencies response does not return a populated array', () => {
        beforeEach(() => {
          getCurrenciesSpy = jest.fn(() => Promise.resolve({ supportedCurrencies: [], alternativeCurrencies: [] }));
          api.keystone.APIM.getCurrencies = getCurrenciesSpy;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });
    });
  });

  describe('post', () => {
    beforeEach(() => {
      getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrenciesResponse));
      api.keystone.APIM.getCurrencies = getCurrenciesSpy;
    });

    const date = new Date();

    const validBody = {
      [`${REQUESTED_START_DATE}-day`]: date.getDate(),
      [`${REQUESTED_START_DATE}-month`]: date.getMonth() + 1,
      [`${REQUESTED_START_DATE}-year`]: date.getFullYear() + 1,
      [TOTAL_MONTHS_OF_COVER]: '1',
      [CURRENCY_CODE]: GBP_CURRENCY_CODE,
    };

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

      it('should call mapAndSave.policy with data from constructPayload function and application', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        expect(mapAndSave.policy).toHaveBeenCalledTimes(1);

        expect(mapAndSave.policy).toHaveBeenCalledWith(payload, res.locals.application);
      });

      it(`should redirect to ${MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE}`, async () => {
        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${req.params.referenceNumber}${MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });

      describe("when the url's last substring is `change`", () => {
        describe(`when an application already has ${TOTAL_SALES_TO_BUYER} and ${MAXIMUM_BUYER_WILL_OWE}`, () => {
          it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
            res.locals.application = applicationWithTotalSalesAndMaximumWillOwe;

            req.originalUrl = MULTIPLE_CONTRACT_POLICY_CHANGE;

            await post(req, res);

            const expected = `${INSURANCE_ROOT}/${refNumber}${CHECK_YOUR_ANSWERS}`;

            expect(res.redirect).toHaveBeenCalledWith(expected);
          });
        });

        describe(`when an application does NOT already have ${TOTAL_SALES_TO_BUYER} and ${MAXIMUM_BUYER_WILL_OWE}`, () => {
          it(`should redirect to ${MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_CHANGE}`, async () => {
            res.locals.application = applicationWithoutTotalSalesAndMaximumWillOwe;

            req.originalUrl = MULTIPLE_CONTRACT_POLICY_CHANGE;

            await post(req, res);

            const expected = `${INSURANCE_ROOT}/${refNumber}${MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_CHANGE}`;

            expect(res.redirect).toHaveBeenCalledWith(expected);
          });
        });
      });

      describe("when the url's last substring is `check-and-change`", () => {
        describe(`when an application already has ${TOTAL_SALES_TO_BUYER} and ${MAXIMUM_BUYER_WILL_OWE}`, () => {
          it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
            res.locals.application = applicationWithTotalSalesAndMaximumWillOwe;

            req.originalUrl = MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE;

            await post(req, res);

            const expected = `${INSURANCE_ROOT}/${refNumber}${CHECK_AND_CHANGE_ROUTE}`;

            expect(res.redirect).toHaveBeenCalledWith(expected);
          });
        });

        describe(`when an application does NOT already have ${TOTAL_SALES_TO_BUYER} and ${MAXIMUM_BUYER_WILL_OWE}`, () => {
          it(`should redirect to ${MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_CHECK_AND_CHANGE}`, async () => {
            res.locals.application = applicationWithoutTotalSalesAndMaximumWillOwe;

            req.originalUrl = MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE;

            await post(req, res);

            const expected = `${INSURANCE_ROOT}/${refNumber}${MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_CHECK_AND_CHANGE}`;

            expect(res.redirect).toHaveBeenCalledWith(expected);
          });
        });
      });
    });

    describe('when there are validation errors', () => {
      it('should call api.keystone.APIM.getCurrencies', async () => {
        await get(req, res);

        expect(getCurrenciesSpy).toHaveBeenCalledTimes(1);
      });

      it('should render template with validation errors and submitted values from constructPayload function', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY.MULTIPLE_CONTRACT_POLICY,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(refNumber),
          userName: getUserNameFromSession(req.session.user),
          application: mapApplicationToFormFields(mockApplication),
          submittedValues: payload,
          ...mapRadioAndSelectOptions(alternativeCurrencies, supportedCurrencies, currencyAnswer),
          validationErrors: generateValidationErrors(payload),
        };

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
      });
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        delete res.locals.application;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('api error handling', () => {
      describe('get currencies call', () => {
        describe('when the get currencies API call fails', () => {
          beforeEach(() => {
            getCurrenciesSpy = jest.fn(() => Promise.reject(new Error('mock')));
            api.keystone.APIM.getCurrencies = getCurrenciesSpy;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });

        describe('when the get currencies response does not return a populated array', () => {
          beforeEach(() => {
            getCurrenciesSpy = jest.fn(() => Promise.resolve({ supportedCurrencies: [], alternativeCurrencies: [] }));
            api.keystone.APIM.getCurrencies = getCurrenciesSpy;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });
      });

      describe('mapAndSave.policy call', () => {
        beforeEach(() => {
          req.body = validBody;
        });

        describe('when no application is returned', () => {
          beforeEach(() => {
            const mapAndSaveSpy = jest.fn(() => Promise.resolve(false));

            mapAndSave.policy = mapAndSaveSpy;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });

        describe('when there is an error', () => {
          beforeEach(() => {
            const mapAndSaveSpy = jest.fn(() => Promise.reject(new Error('mock')));

            mapAndSave.policy = mapAndSaveSpy;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });
      });
    });
  });
});
