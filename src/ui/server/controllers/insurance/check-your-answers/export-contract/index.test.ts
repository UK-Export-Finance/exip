import { FIELD_ID, pageVariables, get, post, TEMPLATE } from '.';
import { BUTTONS, PAGES } from '../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../constants';
import CHECK_YOUR_ANSWERS_FIELD_IDS from '../../../../constants/field-ids/insurance/check-your-answers';
import { CHECK_YOUR_ANSWERS_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/check-your-answers';
import api from '../../../../api';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { exportContractSummaryLists } from '../../../../helpers/summary-lists/export-contract';
import requiredFields from '../../../../helpers/required-fields/export-contract';
import sectionStatus from '../../../../helpers/section-status';
import constructPayload from '../../../../helpers/construct-payload';
import save from '../save-data';
import { Request, ResponseInsurance } from '../../../../../types';
import {
  mockReq,
  mockResInsurance,
  referenceNumber,
  mockApplication,
  mockCountriesAndCurrencies,
  mockSpyPromise,
  mockSpyPromiseRejection,
} from '../../../../test-mocks';

const CHECK_YOUR_ANSWERS_TEMPLATE = TEMPLATES.INSURANCE.CHECK_YOUR_ANSWERS;

const {
  INSURANCE: { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE },
} = ROUTES;

const { exportContract, totalContractValueOverThreshold } = mockApplication;

const {
  finalDestinationKnown,
  privateMarket: { attempted: attemptedPrivateMarketCover },
  agent: {
    isUsingAgent,
    service: {
      agentIsCharging,
      charge: { method: agentChargeMethod },
    },
  },
  awardMethod,
} = exportContract;

const { allCurrencies, countries } = mockCountriesAndCurrencies;

describe('controllers/insurance/check-your-answers/export-contract', () => {
  jest.mock('../save-data');

  let mockSaveSectionReview = mockSpyPromise();

  save.sectionReview = mockSaveSectionReview;

  let req: Request;
  let res: ResponseInsurance;

  let getCountriesAndCurrenciesSpy = jest.fn(() => Promise.resolve(mockCountriesAndCurrencies));

  beforeEach(() => {
    req = mockReq();
    res = mockResInsurance();

    api.keystone.getCountriesAndCurrencies = getCountriesAndCurrenciesSpy;
  });

  describe('FIELD_ID', () => {
    it('should have the correct ID', () => {
      const expected = CHECK_YOUR_ANSWERS_FIELD_IDS.EXPORT_CONTRACT;

      expect(FIELD_ID).toEqual(expected);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELD: {
          ID: FIELD_ID,
          ...FIELDS[FIELD_ID],
        },
        SUBMIT_BUTTON_COPY: BUTTONS.SAVE_AND_BACK,
      };

      expect(pageVariables).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(CHECK_YOUR_ANSWERS_TEMPLATE);
    });
  });

  describe('get', () => {
    it('should call api.keystone.getCountriesAndCurrencies', async () => {
      await get(req, res);

      expect(getCountriesAndCurrenciesSpy).toHaveBeenCalledTimes(1);
    });

    it('should render template', async () => {
      await get(req, res);

      const checkAndChange = true;

      const summaryList = exportContractSummaryLists({
        exportContract,
        totalContractValueOverThreshold,
        referenceNumber,
        countries,
        currencies: allCurrencies,
        checkAndChange,
      });

      const exportContractFields = requiredFields({
        totalContractValueOverThreshold,
        finalDestinationKnown,
        attemptedPrivateMarketCover,
        isUsingAgent,
        agentIsCharging,
        agentChargeMethod,
        awardMethodId: awardMethod?.id,
      });

      const status = sectionStatus(exportContractFields, mockApplication);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.CHECK_YOUR_ANSWERS.YOUR_EXPORT_CONTRACT,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
        ...pageVariables,
        status,
        SUMMARY_LISTS: summaryList,
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
    const mockBody = {
      [FIELD_ID]: 'true',
    };

    beforeEach(() => {
      req.body = mockBody;
    });

    it('should call save.sectionReview with application and data from constructPayload function', async () => {
      await post(req, res);

      const payload = constructPayload(req.body, [FIELD_ID]);

      expect(save.sectionReview).toHaveBeenCalledTimes(1);
      expect(save.sectionReview).toHaveBeenCalledWith(mockApplication, payload);
    });

    it(`should redirect to ${ALL_SECTIONS}`, async () => {
      await post(req, res);

      const expected = `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      expect(res.redirect).toHaveBeenCalledWith(expected);
    });

    describe('api error handling', () => {
      describe('when the save data API call returns false', () => {
        beforeEach(() => {
          mockSaveSectionReview = jest.fn(() => Promise.resolve(false));
          save.sectionReview = mockSaveSectionReview;

          req.body = mockBody;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });

      describe('when the save data API call fails', () => {
        beforeEach(() => {
          mockSaveSectionReview = mockSpyPromiseRejection;
          save.sectionReview = mockSaveSectionReview;

          req.body = mockBody;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });
    });
  });
});
