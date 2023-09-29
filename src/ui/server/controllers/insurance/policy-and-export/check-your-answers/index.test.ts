import { pageVariables, get, post, TEMPLATE } from '.';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import { PAGES } from '../../../../content-strings';
import { POLICY_AND_EXPORTS_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import api from '../../../../api';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import { policyAndExportSummaryList } from '../../../../helpers/summary-lists/policy-and-export';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication, mockCountries, mockCurrencies } from '../../../../test-mocks';

const { INSURANCE_ROOT } = ROUTES.INSURANCE;
const {
  INSURANCE: {
    POLICY_AND_EXPORTS: { CHECK_YOUR_ANSWERS_SAVE_AND_BACK },
    EXPORTER_BUSINESS: { COMPANIES_HOUSE_NUMBER_ROOT },
    PROBLEM_WITH_SERVICE,
  },
} = ROUTES;

const { POLICY_AND_EXPORTS } = FIELD_IDS.INSURANCE;

const { policy, exportContract, referenceNumber } = mockApplication;

describe('controllers/insurance/policy-and-export/check-your-answers', () => {
  let req: Request;
  let res: Response;
  let refNumber: number;

  let getCountriesSpy = jest.fn(() => Promise.resolve(mockCountries));
  let getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrencies));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    req.params.referenceNumber = String(mockApplication.referenceNumber);
    refNumber = Number(mockApplication.referenceNumber);

    api.keystone.countries.getAll = getCountriesSpy;
    api.external.getCurrencies = getCurrenciesSpy;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(refNumber);

      const expected = {
        FIELD: FIELDS[POLICY_AND_EXPORTS.POLICY_TYPE],
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${req.params.referenceNumber}${CHECK_YOUR_ANSWERS_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.POLICY_AND_EXPORTS.CHECK_YOUR_ANSWERS);
    });
  });

  describe('get', () => {
    it('should call api.keystone.countries.getAll', async () => {
      await get(req, res);

      expect(getCountriesSpy).toHaveBeenCalledTimes(1);
    });

    it('should call api.external.getCurrencies', async () => {
      await get(req, res);

      expect(getCurrenciesSpy).toHaveBeenCalledTimes(1);
    });

    it('should render template', async () => {
      await get(req, res);

      const answers = {
        ...policy,
        ...exportContract,
      };

      const summaryList = policyAndExportSummaryList(answers, referenceNumber, mockCountries, mockCurrencies);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY_AND_EXPORTS.CHECK_YOUR_ANSWERS,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(refNumber),
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(res.locals.application),
        SUMMARY_LIST: summaryList,
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
      describe('when the get countries API call fails', () => {
        beforeEach(() => {
          getCountriesSpy = jest.fn(() => Promise.reject());
          api.keystone.countries.getAll = getCountriesSpy;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });

      describe('when the get countries response does not return a populated array', () => {
        beforeEach(() => {
          getCountriesSpy = jest.fn(() => Promise.resolve([]));
          api.keystone.countries.getAll = getCountriesSpy;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });

      describe('when the get currencies API call fails', () => {
        beforeEach(() => {
          getCurrenciesSpy = jest.fn(() => Promise.reject());
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
    it(`should redirect to ${COMPANIES_HOUSE_NUMBER_ROOT}`, () => {
      post(req, res);

      const expected = `${INSURANCE_ROOT}/${req.params.referenceNumber}${COMPANIES_HOUSE_NUMBER_ROOT}`;

      expect(res.redirect).toHaveBeenCalledWith(expected);
    });
  });
});
