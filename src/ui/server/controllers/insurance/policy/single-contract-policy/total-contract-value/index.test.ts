import { PAGE_CONTENT_STRINGS, pageVariables, TEMPLATE, FIELD_ID, get, post } from '.';
import { TEMPLATES } from '../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import { PAGES } from '../../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../../content-strings/fields/insurance';
import getCurrencyByCode from '../../../../../helpers/get-currency-by-code';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../../helpers/construct-payload';
import api from '../../../../../api';
import mapApplicationToFormFields from '../../../../../helpers/mappings/map-application-to-form-fields';
import generateValidationErrors from './validation';
import mapAndSave from '../../map-and-save/policy';
import { Request, Response } from '../../../../../../types';
import { mockReq, mockRes, mockCurrencies, mockCurrenciesResponse, mockCurrenciesEmptyResponse } from '../../../../../test-mocks';
import { mockApplicationMultiplePolicy as mockApplication } from '../../../../../test-mocks/mock-application';

const {
  INSURANCE_ROOT,
  POLICY: {
    NAME_ON_POLICY,
    CHECK_YOUR_ANSWERS,
    SINGLE_CONTRACT_POLICY_CHANGE,
    SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE,
    SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_SAVE_AND_BACK,
  },
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const {
  CONTRACT_POLICY: {
    SINGLE: { TOTAL_CONTRACT_VALUE },
  },
} = POLICY_FIELD_IDS;

const { PAGE_TITLE } = PAGE_CONTENT_STRINGS;

const {
  referenceNumber,
  policy: { policyCurrencyCode },
} = mockApplication;

const { allCurrencies } = mockCurrenciesResponse;

describe('controllers/insurance/policy/single-contract-policy/total-contract-value', () => {
  let req: Request;
  let res: Response;
  let refNumber: number;

  jest.mock('../../map-and-save/policy');

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

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.POLICY.SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(referenceNumber, allCurrencies, String(policyCurrencyCode));

      const currency = getCurrencyByCode(allCurrencies, String(policyCurrencyCode));

      const expected = {
        FIELD: {
          ID: FIELD_ID,
          ...FIELDS.CONTRACT_POLICY.SINGLE[FIELD_ID],
        },
        DYNAMIC_PAGE_TITLE: `${PAGE_TITLE} ${currency.name}?`,
        CURRENCY_PREFIX_SYMBOL: currency.symbol,
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.POLICY.SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE);
    });
  });

  describe('FIELD_ID', () => {
    it('should have the correct ID', () => {
      expect(FIELD_ID).toEqual(TOTAL_CONTRACT_VALUE);
    });
  });

  describe('get', () => {
    it('should call api.keystone.APIM.getCurrencies', async () => {
      await get(req, res);

      expect(getCurrenciesSpy).toHaveBeenCalledTimes(1);
    });

    it('should render template', async () => {
      await get(req, res);

      const generatedPageVariables = pageVariables(referenceNumber, allCurrencies, String(policyCurrencyCode));

      const { DYNAMIC_PAGE_TITLE } = generatedPageVariables;

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: {
            ...PAGE_CONTENT_STRINGS,
            PAGE_TITLE: DYNAMIC_PAGE_TITLE,
          },
          BACK_LINK: req.headers.referer,
        }),
        ...generatedPageVariables,
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(mockApplication),
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

    const validBody = {
      [FIELD_ID]: '1',
    };

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

      it('should call mapAndSave.policy with data from constructPayload function and application', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, [FIELD_ID]);

        expect(mapAndSave.policy).toHaveBeenCalledTimes(1);

        expect(mapAndSave.policy).toHaveBeenCalledWith(payload, res.locals.application);
      });

      it(`should redirect to ${NAME_ON_POLICY}`, async () => {
        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${req.params.referenceNumber}${NAME_ON_POLICY}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });

      describe("when the url's last substring is `change`", () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
          req.originalUrl = SINGLE_CONTRACT_POLICY_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${refNumber}${CHECK_YOUR_ANSWERS}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe("when the url's last substring is `check-and-change`", () => {
        it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
          req.originalUrl = SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${refNumber}${CHECK_AND_CHANGE_ROUTE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
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

        const payload = constructPayload(req.body, [FIELD_ID]);

        const generatedPageVariables = pageVariables(referenceNumber, mockCurrencies, String(policyCurrencyCode));

        const { DYNAMIC_PAGE_TITLE } = generatedPageVariables;

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: {
              ...PAGE_CONTENT_STRINGS,
              PAGE_TITLE: DYNAMIC_PAGE_TITLE,
            },
            BACK_LINK: req.headers.referer,
          }),
          ...generatedPageVariables,
          userName: getUserNameFromSession(req.session.user),
          application: mapApplicationToFormFields(mockApplication),
          submittedValues: payload,
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
