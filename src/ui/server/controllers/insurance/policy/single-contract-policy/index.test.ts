import { pageVariables, TEMPLATE, FIELD_IDS, get, post } from '.';
import { TEMPLATES } from '../../../../constants';
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
import { mockReq, mockRes, mockCurrencies, mockCurrenciesResponse, mockCurrenciesEmptyResponse } from '../../../../test-mocks';
import mockApplication, { referenceNumber, mockApplicationSinglePolicyWithoutCurrencyCode } from '../../../../test-mocks/mock-application';

const {
  INSURANCE_ROOT,
  POLICY: {
    SINGLE_CONTRACT_POLICY_SAVE_AND_BACK,
    SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE,
    SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHANGE,
    SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHECK_AND_CHANGE,
    CHECK_YOUR_ANSWERS,
    SINGLE_CONTRACT_POLICY_CHANGE,
    SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE,
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
      SINGLE: { CONTRACT_COMPLETION_DATE, CONTRACT_COMPLETION_DATE_DAY, CONTRACT_COMPLETION_DATE_MONTH, CONTRACT_COMPLETION_DATE_YEAR, TOTAL_CONTRACT_VALUE },
      POLICY_CURRENCY_CODE,
    },
  },
} = INSURANCE_FIELD_IDS;

const applicationWithTotalContractValue = {
  ...mockApplication,
  policy: {
    ...mockApplication.policy,
    [TOTAL_CONTRACT_VALUE]: '1234',
  },
};

const applicationWithoutTotalContractValue = {
  ...mockApplication,
  policy: {
    ...mockApplication.policy,
    [TOTAL_CONTRACT_VALUE]: null,
  },
};

const { supportedCurrencies, alternativeCurrencies } = mockCurrenciesResponse;

const applicationCurrencyAnswer = mockApplication.policy[POLICY_CURRENCY_CODE];

describe('controllers/insurance/policy/single-contract-policy', () => {
  let req: Request;
  let res: Response;

  jest.mock('../save-data/policy');

  mapAndSave.policy = jest.fn(() => Promise.resolve(true));
  let getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrenciesResponse));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    api.keystone.APIM.getCurrencies = getCurrenciesSpy;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(referenceNumber);

      const expected = {
        FIELDS: {
          REQUESTED_START_DATE: {
            ID: REQUESTED_START_DATE,
            ...FIELDS.CONTRACT_POLICY[REQUESTED_START_DATE],
          },
          CONTRACT_COMPLETION_DATE: {
            ID: CONTRACT_COMPLETION_DATE,
            ...FIELDS.CONTRACT_POLICY.SINGLE[CONTRACT_COMPLETION_DATE],
          },
          CURRENCY_CODE: {
            ID: CURRENCY_CODE,
            ...FIELDS.CONTRACT_POLICY[CURRENCY_CODE],
          },
          ALTERNATIVE_CURRENCY_CODE: {
            ID: ALTERNATIVE_CURRENCY_CODE,
          },
        },
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.POLICY.SINGLE_CONTRACT_POLICY);
    });
  });

  describe('FIELD_IDS', () => {
    it('should have the correct FIELD_IDS', () => {
      const expected = [
        REQUESTED_START_DATE_DAY,
        REQUESTED_START_DATE_MONTH,
        REQUESTED_START_DATE_YEAR,
        CONTRACT_COMPLETION_DATE_DAY,
        CONTRACT_COMPLETION_DATE_MONTH,
        CONTRACT_COMPLETION_DATE_YEAR,
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
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY.SINGLE_CONTRACT_POLICY,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(referenceNumber),
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(mockApplication),
        ...mapRadioAndSelectOptions(alternativeCurrencies, supportedCurrencies, applicationCurrencyAnswer),
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
          getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrenciesEmptyResponse));
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
    const futureDate = new Date(date.setDate(date.getDate() + 1));

    const day = futureDate.getDate();
    const month = futureDate.getMonth() + 1;
    const year = futureDate.getFullYear();

    const oneYearFromNow = new Date(futureDate.setFullYear(year + 1)).getFullYear();
    const twoYearsFromNow = new Date(futureDate.setFullYear(year + 2)).getFullYear();

    const validBody = {
      [`${REQUESTED_START_DATE}-day`]: day,
      [`${REQUESTED_START_DATE}-month`]: month,
      [`${REQUESTED_START_DATE}-year`]: oneYearFromNow,
      [`${CONTRACT_COMPLETION_DATE}-day`]: day,
      [`${CONTRACT_COMPLETION_DATE}-month`]: month,
      [`${CONTRACT_COMPLETION_DATE}-year`]: twoYearsFromNow,
      [CURRENCY_CODE]: mockCurrencies[0].isoCode,
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

      it(`should redirect to ${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE}`, async () => {
        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${req.params.referenceNumber}${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });

      describe("when the url's last substring is `change`", () => {
        describe(`when an application already has ${TOTAL_CONTRACT_VALUE}`, () => {
          it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
            res.locals.application = applicationWithTotalContractValue;

            req.originalUrl = SINGLE_CONTRACT_POLICY_CHANGE;

            await post(req, res);

            const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

            expect(res.redirect).toHaveBeenCalledWith(expected);
          });
        });

        describe(`when an application does NOT already have ${TOTAL_CONTRACT_VALUE}`, () => {
          it(`should redirect to ${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHANGE}`, async () => {
            res.locals.application = applicationWithoutTotalContractValue;

            req.originalUrl = SINGLE_CONTRACT_POLICY_CHANGE;

            await post(req, res);

            const expected = `${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHANGE}`;

            expect(res.redirect).toHaveBeenCalledWith(expected);
          });
        });
      });

      describe("when the url's last substring is `check-and-change`", () => {
        describe(`when an application already has ${TOTAL_CONTRACT_VALUE}`, () => {
          it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
            res.locals.application = applicationWithTotalContractValue;

            req.originalUrl = SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE;

            await post(req, res);

            const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`;

            expect(res.redirect).toHaveBeenCalledWith(expected);
          });
        });

        describe(`when an application does NOT already have ${TOTAL_CONTRACT_VALUE}`, () => {
          it(`should redirect to ${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHECK_AND_CHANGE}`, async () => {
            res.locals.application = applicationWithoutTotalContractValue;

            req.originalUrl = SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE;

            await post(req, res);

            const expected = `${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHECK_AND_CHANGE}`;

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

      describe(`when the application has a ${POLICY_CURRENCY_CODE} answer`, () => {
        it('should render template with validation errors and submitted values from constructPayload function and application', async () => {
          await post(req, res);

          const payload = constructPayload(req.body, FIELD_IDS);

          const expectedVariables = {
            ...insuranceCorePageVariables({
              PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY.SINGLE_CONTRACT_POLICY,
              BACK_LINK: req.headers.referer,
            }),
            ...pageVariables(referenceNumber),
            userName: getUserNameFromSession(req.session.user),
            application: mapApplicationToFormFields(mockApplication),
            submittedValues: payload,
            ...mapRadioAndSelectOptions(alternativeCurrencies, supportedCurrencies, applicationCurrencyAnswer),
            validationErrors: generateValidationErrors(payload),
          };

          expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
        });
      });

      describe(`when the application does NOT have a ${POLICY_CURRENCY_CODE} answer`, () => {
        it('should render template with validation errors and submitted values from constructPayload function', async () => {
          res.locals.application = mockApplicationSinglePolicyWithoutCurrencyCode;

          await post(req, res);

          const payload = constructPayload(req.body, FIELD_IDS);

          const expectedVariables = {
            ...insuranceCorePageVariables({
              PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY.SINGLE_CONTRACT_POLICY,
              BACK_LINK: req.headers.referer,
            }),
            ...pageVariables(referenceNumber),
            userName: getUserNameFromSession(req.session.user),
            application: mapApplicationToFormFields(mockApplicationSinglePolicyWithoutCurrencyCode),
            submittedValues: payload,
            ...mapRadioAndSelectOptions(alternativeCurrencies, supportedCurrencies, payload[POLICY_CURRENCY_CODE]),
            validationErrors: generateValidationErrors(payload),
          };

          expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
        });
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
            getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrenciesEmptyResponse));
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

        describe('when a true boolean is not returned', () => {
          beforeEach(() => {
            const savePolicyDataSpy = jest.fn(() => Promise.resolve(false));

            mapAndSave.policy = savePolicyDataSpy;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });

        describe('when there is an error', () => {
          beforeEach(() => {
            const savePolicyDataSpy = jest.fn(() => Promise.reject(new Error('mock')));

            mapAndSave.policy = savePolicyDataSpy;
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
