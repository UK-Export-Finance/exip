import { pageVariables, get, post, TEMPLATE } from '.';
import { FIELD_IDS, TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { PAGES } from '../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import api from '../../../../api';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import { policySummaryLists } from '../../../../helpers/summary-lists/policy';
import { Request, ResponseInsurance } from '../../../../../types';
import {
  mockReq,
  mockResInsurance,
  mockApplication,
  mockContact,
  mockCountriesAndCurrencies,
  mockNominatedLossPayee,
  mockSpyPromiseRejection,
  referenceNumber,
} from '../../../../test-mocks';
import { mockBroker } from '../../../../test-mocks/mock-application';

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = INSURANCE_ROUTES;

const { POLICY } = FIELD_IDS.INSURANCE;

const { policy, exportContract } = mockApplication;

const { allCurrencies, countries } = mockCountriesAndCurrencies;

describe('controllers/insurance/policy/check-your-answers', () => {
  let req: Request;
  let res: ResponseInsurance;

  let getCountriesAndCurrenciesSpy = jest.fn(() => Promise.resolve(mockCountriesAndCurrencies));

  beforeEach(() => {
    req = mockReq();
    res = mockResInsurance();

    api.keystone.getCountriesAndCurrencies = getCountriesAndCurrenciesSpy;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(referenceNumber);

      const expected = {
        FIELD: FIELDS[POLICY.POLICY_TYPE],
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.POLICY.CHECK_YOUR_ANSWERS);
    });
  });

  describe('get', () => {
    it('should call api.keystone.getCountriesAndCurrencies', async () => {
      await get(req, res);

      expect(getCountriesAndCurrenciesSpy).toHaveBeenCalledTimes(1);
    });

    it('should render template', async () => {
      await get(req, res);

      const answers = {
        ...policy,
        ...exportContract,
      };

      const summaryLists = policySummaryLists({
        policy: answers,
        policyContact: mockContact,
        broker: mockBroker,
        nominatedLossPayee: mockNominatedLossPayee,
        referenceNumber,
        currencies: allCurrencies,
        countries,
      });

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY.CHECK_YOUR_ANSWERS,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(referenceNumber),
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(res.locals.application),
        SUMMARY_LISTS: summaryLists,
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });

    describe('api error handling', () => {
      describe('when the currencies and countries API call fails', () => {
        beforeEach(() => {
          getCountriesAndCurrenciesSpy = mockSpyPromiseRejection;
          api.keystone.getCountriesAndCurrencies = getCountriesAndCurrenciesSpy;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });

      describe('when the get currencies and countries response does not return populated allCurrencies', () => {
        beforeEach(() => {
          getCountriesAndCurrenciesSpy = jest.fn(() => Promise.resolve({ ...mockCountriesAndCurrencies, allCurrencies: [] }));
          api.keystone.getCountriesAndCurrencies = getCountriesAndCurrenciesSpy;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });

      describe('when the get currencies and countries response does not return populated countries', () => {
        beforeEach(() => {
          getCountriesAndCurrenciesSpy = jest.fn(() => Promise.resolve({ ...mockCountriesAndCurrencies, countries: [] }));
          api.keystone.getCountriesAndCurrencies = getCountriesAndCurrenciesSpy;
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
