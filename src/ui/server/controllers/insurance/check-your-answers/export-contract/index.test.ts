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
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, referenceNumber, mockApplication, mockCountries } from '../../../../test-mocks';

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
} = exportContract;

describe('controllers/insurance/check-your-answers/export-contract', () => {
  let req: Request;
  let res: Response;

  let getCountriesSpy = jest.fn(() => Promise.resolve(mockCountries));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    api.keystone.countries.getAll = getCountriesSpy;
  });

  describe('FIELD_ID', () => {
    it('should have the correct FIELD_ID', () => {
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
    it('should call api.keystone.countries.getAll', async () => {
      await get(req, res);

      expect(getCountriesSpy).toHaveBeenCalledTimes(1);
    });

    it('should render template', async () => {
      await get(req, res);

      const checkAndChange = true;

      const summaryList = exportContractSummaryLists(exportContract, totalContractValueOverThreshold, referenceNumber, mockCountries, checkAndChange);

      const exportContractFields = requiredFields({
        totalContractValueOverThreshold,
        finalDestinationKnown,
        attemptedPrivateMarketCover,
        isUsingAgent,
        agentIsCharging,
        agentChargeMethod,
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

    describe('when there is no application', () => {
      beforeEach(() => {
        delete res.locals.application;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when the get countries API call fails', () => {
      beforeEach(() => {
        getCountriesSpy = jest.fn(() => Promise.reject(new Error('mock')));
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
  });

  describe('post', () => {
    const mockBody = {
      [FIELD_ID]: 'true',
    };

    beforeEach(() => {
      req.body = mockBody;
    });

    it(`should redirect to ${ALL_SECTIONS}`, async () => {
      await post(req, res);

      const expected = `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

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
  });
});
