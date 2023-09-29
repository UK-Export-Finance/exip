import { FIELD_ID, pageVariables, get, post, TEMPLATE } from '.';
import { PAGES } from '../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../constants';
import CHECK_YOUR_ANSWERS_FIELD_IDS from '../../../../constants/field-ids/insurance/check-your-answers';
import { CHECK_YOUR_ANSWERS_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/check-your-answers';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { policyAndExportSummaryList } from '../../../../helpers/summary-lists/policy-and-export';
import api from '../../../../api';
import requiredFields from '../../../../helpers/required-fields/policy-and-exports';
import sectionStatus from '../../../../helpers/section-status';
import constructPayload from '../../../../helpers/construct-payload';
import save from '../save-data';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication, mockCountries, mockCurrencies } from '../../../../test-mocks';

const CHECK_YOUR_ANSWERS_TEMPLATE = TEMPLATES.INSURANCE.CHECK_YOUR_ANSWERS;

const {
  INSURANCE: {
    INSURANCE_ROOT,
    CHECK_YOUR_ANSWERS: { YOUR_BUSINESS, TYPE_OF_POLICY_SAVE_AND_BACK },
    PROBLEM_WITH_SERVICE,
  },
} = ROUTES;

const { policy, exportContract, referenceNumber } = mockApplication;

describe('controllers/insurance/check-your-answers/policy-and-exports', () => {
  jest.mock('../save-data');

  let mockSaveSectionReview = jest.fn(() => Promise.resolve({}));

  save.sectionReview = mockSaveSectionReview;

  let req: Request;
  let res: Response;

  let getCountriesSpy = jest.fn(() => Promise.resolve(mockCountries));
  let getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrencies));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    req.params.referenceNumber = String(referenceNumber);
    api.keystone.countries.getAll = getCountriesSpy;
    api.external.getCurrencies = getCurrenciesSpy;
  });

  describe('FIELD_ID', () => {
    it('should have the correct FIELD_ID', () => {
      const expected = CHECK_YOUR_ANSWERS_FIELD_IDS.POLICY_AND_EXPORT;

      expect(FIELD_ID).toEqual(expected);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(referenceNumber);

      const expected = {
        FIELD: {
          ID: FIELD_ID,
          ...FIELDS[FIELD_ID],
        },
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(CHECK_YOUR_ANSWERS_TEMPLATE);
    });
  });

  describe('get', () => {
    it('should render template', async () => {
      await get(req, res);
      const checkAndChange = true;

      const answers = {
        ...policy,
        ...exportContract,
      };

      const summaryList = policyAndExportSummaryList(answers, referenceNumber, mockCountries, mockCurrencies, checkAndChange);

      const fields = requiredFields(policy.policyType);

      const status = sectionStatus(fields, mockApplication);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.CHECK_YOUR_ANSWERS.POLICY_AND_EXPORTS,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
        SUMMARY_LIST: summaryList,
        ...pageVariables(referenceNumber),
        status,
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

    it(`should redirect to ${YOUR_BUSINESS}`, async () => {
      await post(req, res);

      const expected = `${INSURANCE_ROOT}/${req.params.referenceNumber}${YOUR_BUSINESS}`;

      expect(res.redirect).toHaveBeenCalledWith(expected);
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
      describe('when the save data API call does not return anything', () => {
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
          mockSaveSectionReview = jest.fn(() => Promise.reject());
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
