import { get, post, TEMPLATE } from '.';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { PAGES } from '../../../../content-strings';
import api from '../../../../api';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import { exportContractSummaryLists } from '../../../../helpers/summary-lists/export-contract';
import { Request, ResponseInsurance } from '../../../../../types';
import {
  mockReq,
  mockResInsurance,
  mockApplication,
  mockCountries,
  mockCurrencies,
  mockCurrenciesEmptyResponse,
  mockCurrenciesResponse,
  mockSpyPromiseRejection,
} from '../../../../test-mocks';

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = INSURANCE_ROUTES;

const { exportContract, referenceNumber, totalContractValueOverThreshold } = mockApplication;

describe('controllers/insurance/export-contract/check-your-answers', () => {
  let req: Request;
  let res: ResponseInsurance;

  let getCountriesSpy = jest.fn(() => Promise.resolve(mockCountries));
  let getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrenciesResponse));

  beforeEach(() => {
    req = mockReq();
    res = mockResInsurance();

    api.keystone.countries.getAll = getCountriesSpy;
    api.keystone.APIM.getCurrencies = getCurrenciesSpy;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.EXPORT_CONTRACT.CHECK_YOUR_ANSWERS);
    });
  });

  describe('get', () => {
    it('should call api.keystone.countries.getAll', async () => {
      await get(req, res);

      expect(getCountriesSpy).toHaveBeenCalledTimes(1);
    });

    it('should call api.keystone.APIM.getCurrencies', async () => {
      await get(req, res);

      expect(getCurrenciesSpy).toHaveBeenCalledTimes(1);
    });

    it('should render template', async () => {
      await get(req, res);

      const summaryLists = exportContractSummaryLists({
        exportContract,
        totalContractValueOverThreshold,
        referenceNumber,
        countries: mockCountries,
        currencies: mockCurrencies,
      });

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.EXPORT_CONTRACT.CHECK_YOUR_ANSWERS,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(res.locals.application),
        SUMMARY_LISTS: summaryLists,
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });

    describe('api error handling', () => {
      describe('when the get countries API call fails', () => {
        beforeEach(() => {
          getCountriesSpy = mockSpyPromiseRejection;
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
          getCurrenciesSpy = mockSpyPromiseRejection;
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
    it(`should redirect to ${ALL_SECTIONS}`, () => {
      post(req, res);

      const expected = `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      expect(res.redirect).toHaveBeenCalledWith(expected);
    });
  });
});
