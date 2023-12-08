import { pageVariables, TEMPLATE, FIELD_IDS, totalMonthsOfCoverOptions, get, post } from '.';
import { GBP_CURRENCY_CODE, ROUTES, TEMPLATES } from '../../../../constants';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { PAGES } from '../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import api from '../../../../api';
import mapCurrenciesAsRadioOptions from '../../../../helpers/mappings/map-currencies/as-radio-options';
import mapTotalMonthsOfCover from '../../../../helpers/mappings/map-total-months-of-insurance';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import generateValidationErrors from './validation';
import mapAndSave from '../map-and-save/policy';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockCurrencies } from '../../../../test-mocks';
import { mockApplicationMultiplePolicy as mockApplication } from '../../../../test-mocks/mock-application';

const {
  INSURANCE: {
    INSURANCE_ROOT,
    POLICY: { MULTIPLE_CONTRACT_POLICY_SAVE_AND_BACK, ABOUT_GOODS_OR_SERVICES, CHECK_YOUR_ANSWERS },
    CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY: CHECK_AND_CHANGE_ROUTE },
    PROBLEM_WITH_SERVICE,
  },
} = ROUTES;

const {
  CONTRACT_POLICY: {
    REQUESTED_START_DATE,
    REQUESTED_START_DATE_DAY,
    REQUESTED_START_DATE_MONTH,
    REQUESTED_START_DATE_YEAR,
    MULTIPLE: { TOTAL_MONTHS_OF_COVER, TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
    POLICY_CURRENCY_CODE,
  },
} = POLICY_FIELD_IDS;

describe('controllers/insurance/policy/multiple-contract-policy', () => {
  let req: Request;
  let res: Response;
  let refNumber: number;

  jest.mock('../map-and-save/policy');

  mapAndSave.policy = jest.fn(() => Promise.resolve(true));
  let getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrencies));

  const mockApplicationWithoutOptionsSubmission = {
    ...mockApplication,
    policy: {
      ...mockApplication.policy,
      [POLICY_CURRENCY_CODE]: null,
      [TOTAL_MONTHS_OF_COVER]: null,
    },
  };

  const currencyCode = mockCurrencies[0].isoCode;
  const monthsOfCover = 1;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplicationWithoutOptionsSubmission;
    req.params.referenceNumber = String(mockApplication.referenceNumber);
    refNumber = Number(mockApplication.referenceNumber);
    api.external.getCurrencies = getCurrenciesSpy;
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
          TOTAL_SALES_TO_BUYER: {
            ID: TOTAL_SALES_TO_BUYER,
            ...FIELDS.CONTRACT_POLICY.MULTIPLE[TOTAL_SALES_TO_BUYER],
          },
          MAXIMUM_BUYER_WILL_OWE: {
            ID: MAXIMUM_BUYER_WILL_OWE,
            ...FIELDS.CONTRACT_POLICY.MULTIPLE[MAXIMUM_BUYER_WILL_OWE],
          },
          POLICY_CURRENCY_CODE: {
            ID: POLICY_CURRENCY_CODE,
            ...FIELDS.CONTRACT_POLICY[POLICY_CURRENCY_CODE],
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
        TOTAL_SALES_TO_BUYER,
        MAXIMUM_BUYER_WILL_OWE,
        POLICY_CURRENCY_CODE,
      ];

      expect(FIELD_IDS).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should call api.external.getCurrencies', async () => {
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
        application: mapApplicationToFormFields(mockApplicationWithoutOptionsSubmission),
        currencies: mapCurrenciesAsRadioOptions(mockCurrencies),
        monthOptions: mapTotalMonthsOfCover(totalMonthsOfCoverOptions),
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });

    describe('when a policy currency code has been previously submitted', () => {
      const mockApplicationWithCurrency = {
        ...mockApplicationWithoutOptionsSubmission,
        policy: {
          ...mockApplicationWithoutOptionsSubmission.policy,
          [POLICY_CURRENCY_CODE]: currencyCode,
        },
      };

      beforeEach(() => {
        res.locals.application = mockApplicationWithCurrency;
      });

      it('should render template with currencies mapped to submitted currency', async () => {
        await get(req, res);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY.MULTIPLE_CONTRACT_POLICY,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(refNumber),
          userName: getUserNameFromSession(req.session.user),
          application: mapApplicationToFormFields(mockApplicationWithCurrency),
          currencies: mapCurrenciesAsRadioOptions(mockCurrencies),
          monthOptions: mapTotalMonthsOfCover(totalMonthsOfCoverOptions),
        };

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
      });
    });

    describe('when total months of cover has been previously submitted', () => {
      const mockApplicationWithMonths = {
        ...mockApplicationWithoutOptionsSubmission,
        policy: {
          ...mockApplicationWithoutOptionsSubmission.policy,
          [TOTAL_MONTHS_OF_COVER]: monthsOfCover,
        },
      };

      beforeEach(() => {
        res.locals.application = mockApplicationWithMonths;
      });

      it('should render template with months of cover mapped to submitted months of cover', async () => {
        await get(req, res);

        const expectedMonthOptions = mapTotalMonthsOfCover(totalMonthsOfCoverOptions, monthsOfCover);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY.MULTIPLE_CONTRACT_POLICY,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(refNumber),
          userName: getUserNameFromSession(req.session.user),
          application: mapApplicationToFormFields(mockApplicationWithMonths),
          currencies: mapCurrenciesAsRadioOptions(mockCurrencies),
          monthOptions: expectedMonthOptions,
        };

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
      });
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
          api.external.getCurrencies = getCurrenciesSpy;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });

      describe('when the get currencies response does not return a populated array', () => {
        beforeEach(() => {
          getCurrenciesSpy = jest.fn(() => Promise.resolve([]));
          api.external.getCurrencies = getCurrenciesSpy;
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
      getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrencies));
      api.external.getCurrencies = getCurrenciesSpy;
    });

    const date = new Date();

    const validBody = {
      [`${REQUESTED_START_DATE}-day`]: date.getDate(),
      [`${REQUESTED_START_DATE}-month`]: date.getMonth() + 1,
      [`${REQUESTED_START_DATE}-year`]: date.getFullYear() + 1,
      [TOTAL_MONTHS_OF_COVER]: '1',
      [TOTAL_SALES_TO_BUYER]: '1000',
      [MAXIMUM_BUYER_WILL_OWE]: '500',
      [POLICY_CURRENCY_CODE]: GBP_CURRENCY_CODE,
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

      it(`should redirect to ${ABOUT_GOODS_OR_SERVICES}`, async () => {
        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${req.params.referenceNumber}${ABOUT_GOODS_OR_SERVICES}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });

      describe("when the url's last substring is `change`", () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
          req.originalUrl = ROUTES.INSURANCE.POLICY.MULTIPLE_CONTRACT_POLICY_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${refNumber}${CHECK_YOUR_ANSWERS}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe("when the url's last substring is `check-and-change`", () => {
        it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
          req.originalUrl = ROUTES.INSURANCE.POLICY.MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${refNumber}${CHECK_AND_CHANGE_ROUTE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });
    });

    describe('when there are validation errors', () => {
      it('should call api.external.getCurrencies', async () => {
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
          application: mapApplicationToFormFields(mockApplicationWithoutOptionsSubmission),
          submittedValues: payload,
          currencies: mapCurrenciesAsRadioOptions(mockCurrencies),
          monthOptions: mapTotalMonthsOfCover(totalMonthsOfCoverOptions),
          validationErrors: generateValidationErrors(payload),
        };

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
      });

      describe('when total months of cover is submitted', () => {
        const mockFormBody = {
          [TOTAL_MONTHS_OF_COVER]: monthsOfCover,
        };

        beforeEach(() => {
          req.body = mockFormBody;
        });

        it('should render template with months of cover mapped to submitted months of cover', async () => {
          await post(req, res);

          const payload = constructPayload(req.body, FIELD_IDS);

          const expectedMonthOptions = mapTotalMonthsOfCover(totalMonthsOfCoverOptions, monthsOfCover);

          const expectedVariables = {
            ...insuranceCorePageVariables({
              PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY.MULTIPLE_CONTRACT_POLICY,
              BACK_LINK: req.headers.referer,
            }),
            ...pageVariables(refNumber),
            userName: getUserNameFromSession(req.session.user),
            application: mapApplicationToFormFields(mockApplicationWithoutOptionsSubmission),
            submittedValues: payload,
            currencies: mapCurrenciesAsRadioOptions(mockCurrencies),
            monthOptions: expectedMonthOptions,
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
            api.external.getCurrencies = getCurrenciesSpy;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });

        describe('when the get currencies response does not return a populated array', () => {
          beforeEach(() => {
            getCurrenciesSpy = jest.fn(() => Promise.resolve([]));
            api.external.getCurrencies = getCurrenciesSpy;
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
