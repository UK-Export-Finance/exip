import { pageVariables, FIELD_IDS, PAGE_CONTENT_STRINGS, TEMPLATE, get, post } from '.';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import EXPORT_CONTRACT_FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';
import { PAGES } from '../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/export-contract';
import api from '../../../../api';
import mapCountries from '../../../../helpers/mappings/map-countries';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import mapAndSave from '../map-and-save/export-contract-agent';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication, mockApplicationAgentServiceEmpty, mockCountries, referenceNumber } from '../../../../test-mocks';

const {
  INSURANCE_ROOT,
  EXPORT_CONTRACT: {
    AGENT_DETAILS_CHANGE,
    AGENT_DETAILS_CHECK_AND_CHANGE,
    AGENT_DETAILS_SAVE_AND_BACK,
    AGENT_SERVICE,
    AGENT_SERVICE_CHECK_AND_CHANGE,
    CHECK_YOUR_ANSWERS,
  },
  CHECK_YOUR_ANSWERS: { EXPORT_CONTRACT: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const {
  AGENT_DETAILS: { NAME, FULL_ADDRESS, COUNTRY_CODE },
} = EXPORT_CONTRACT_FIELD_IDS;

describe('controllers/insurance/export-contract/agent-details', () => {
  let req: Request;
  let res: Response;

  jest.mock('../map-and-save/export-contract-agent');

  let getCountriesSpy = jest.fn(() => Promise.resolve(mockCountries));
  mapAndSave.exportContractAgent = jest.fn(() => Promise.resolve(true));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    api.keystone.countries.getAll = getCountriesSpy;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('FIELD_IDS', () => {
    it('should have the correct FIELD_IDS', () => {
      const expected = [NAME, FULL_ADDRESS, COUNTRY_CODE];

      expect(FIELD_IDS).toEqual(expected);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.EXPORT_CONTRACT.AGENT_DETAILS);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.EXPORT_CONTRACT.AGENT_DETAILS);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(referenceNumber);

      const expected = {
        FIELDS: {
          NAME: {
            ID: NAME,
            ...FIELDS.AGENT_DETAILS[NAME],
          },
          FULL_ADDRESS: {
            ID: FULL_ADDRESS,
            ...FIELDS.AGENT_DETAILS[FULL_ADDRESS],
          },
          COUNTRY_CODE: {
            ID: COUNTRY_CODE,
            ...FIELDS.AGENT_DETAILS[COUNTRY_CODE],
          },
        },
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${AGENT_DETAILS_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should call api.keystone.countries.getAll', async () => {
      await get(req, res);

      expect(getCountriesSpy).toHaveBeenCalledTimes(1);
    });

    it('should render template', async () => {
      await get(req, res);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(referenceNumber),
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(mockApplication),
        countries: mapCountries(mockCountries, mockApplication.exportContract.agent[COUNTRY_CODE]),
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

    describe('when the get countries API call does not return a populated array', () => {
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
    const validBody = {
      [NAME]: mockApplication.exportContract.agent[NAME],
      [FULL_ADDRESS]: mockApplication.exportContract.agent[FULL_ADDRESS],
      [COUNTRY_CODE]: mockCountries[0].isoCode,
    };

    beforeEach(() => {
      getCountriesSpy = jest.fn(() => Promise.resolve(mockCountries));

      api.keystone.countries.getAll = getCountriesSpy;
    });

    describe('when there are validation errors', () => {
      it('should call api.keystone.countries.getAll', async () => {
        await post(req, res);

        expect(getCountriesSpy).toHaveBeenCalledTimes(1);
      });

      it('should render template with validation errors and submitted values', async () => {
        req.body = {};
        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        const validationErrors = generateValidationErrors(payload);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(referenceNumber),
          userName: getUserNameFromSession(req.session.user),
          application: mapApplicationToFormFields(mockApplication),
          submittedValues: payload,
          validationErrors,
          countries: mapCountries(mockCountries),
        });
      });

      describe('when the get countries API call fails', () => {
        beforeEach(() => {
          getCountriesSpy = jest.fn(() => Promise.reject(new Error('mock')));
          api.keystone.countries.getAll = getCountriesSpy;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });

      describe('when the get countries API call does not return a populated array', () => {
        beforeEach(() => {
          getCountriesSpy = jest.fn(() => Promise.resolve([]));
          api.keystone.countries.getAll = getCountriesSpy;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });
    });

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

      it('should NOT call api.keystone.countries.getAll', async () => {
        await post(req, res);

        expect(getCountriesSpy).toHaveBeenCalledTimes(0);
      });

      it('should call mapAndSave.exportContractAgent with data from constructPayload function and application', async () => {
        req.body = validBody;

        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        expect(mapAndSave.exportContractAgent).toHaveBeenCalledTimes(1);

        expect(mapAndSave.exportContractAgent).toHaveBeenCalledWith(payload, res.locals.application);
      });

      it(`should redirect to ${AGENT_SERVICE}`, async () => {
        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${referenceNumber}${AGENT_SERVICE}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });

      describe("when the url's last substring is `change`", () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
          req.body = validBody;

          req.originalUrl = AGENT_DETAILS_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe("when the url's last substring is `check-and-change` and agent service data is available", () => {
        it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
          req.body = validBody;

          req.originalUrl = AGENT_DETAILS_CHECK_AND_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${AGENT_SERVICE_CHECK_AND_CHANGE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe("when the url's last substring is `check-and-change` and no agent service data is available", () => {
        it(`should redirect to ${AGENT_SERVICE_CHECK_AND_CHANGE}`, async () => {
          req.body = validBody;

          req.originalUrl = AGENT_DETAILS_CHECK_AND_CHANGE;

          res.locals.application = mockApplicationAgentServiceEmpty;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${AGENT_SERVICE_CHECK_AND_CHANGE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
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

    describe('when mapAndSave.exportContractAgent does not return a true boolean', () => {
      beforeEach(() => {
        req.body = validBody;
        const mapAndSaveSpy = jest.fn(() => Promise.resolve(false));

        mapAndSave.exportContractAgent = mapAndSaveSpy;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when mapAndSave.exportContractAgent returns an error', () => {
      beforeEach(() => {
        req.body = validBody;
        const mapAndSaveSpy = jest.fn(() => Promise.reject(new Error('mock')));

        mapAndSave.exportContractAgent = mapAndSaveSpy;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
