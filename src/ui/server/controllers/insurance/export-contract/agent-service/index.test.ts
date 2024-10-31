import { pageVariables, FIELD_IDS, PAGE_CONTENT_STRINGS, TEMPLATE, HTML_FLAGS, get, post } from '.';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import EXPORT_CONTRACT_FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';
import { PAGES } from '../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/export-contract';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import mapAndSave from '../map-and-save/export-contract-agent-service';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication, mockSpyPromiseRejection, referenceNumber } from '../../../../test-mocks';

const {
  INSURANCE_ROOT,
  PROBLEM_WITH_SERVICE,
  EXPORT_CONTRACT: {
    AGENT_CHARGES,
    AGENT_CHARGES_CHANGE,
    AGENT_CHARGES_CHECK_AND_CHANGE,
    CHECK_YOUR_ANSWERS,
    AGENT_SERVICE_CHANGE,
    AGENT_SERVICE_CHECK_AND_CHANGE,
    AGENT_SERVICE_SAVE_AND_BACK,
  },
  CHECK_YOUR_ANSWERS: { EXPORT_CONTRACT: CHECK_AND_CHANGE_ROUTE },
} = INSURANCE_ROUTES;

const {
  AGENT_SERVICE: { IS_CHARGING, SERVICE_DESCRIPTION },
} = EXPORT_CONTRACT_FIELD_IDS;

describe('controllers/insurance/export-contract/agent-service', () => {
  let req: Request;
  let res: Response;

  jest.mock('../map-and-save/export-contract-agent-service');

  mapAndSave.exportContractAgentService = jest.fn(() => Promise.resolve(true));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('FIELD_IDS', () => {
    it('should have the correct FIELD_IDS', () => {
      const expected = [IS_CHARGING, SERVICE_DESCRIPTION];

      expect(FIELD_IDS).toEqual(expected);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.EXPORT_CONTRACT.AGENT_SERVICE);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.EXPORT_CONTRACT.AGENT_SERVICE);
    });
  });

  describe('HTML_FLAGS', () => {
    it('should have correct properties', () => {
      const expected = {
        HORIZONTAL_RADIOS: true,
        NO_RADIO_AS_FIRST_OPTION: true,
      };

      expect(HTML_FLAGS).toEqual(expected);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(referenceNumber);

      const expected = {
        FIELDS: {
          IS_CHARGING: {
            ID: IS_CHARGING,
            ...FIELDS.AGENT_SERVICE[IS_CHARGING],
          },
          SERVICE_DESCRIPTION: {
            ID: SERVICE_DESCRIPTION,
            ...FIELDS.AGENT_SERVICE[SERVICE_DESCRIPTION],
          },
        },
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${AGENT_SERVICE_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
          HTML_FLAGS,
        }),
        ...pageVariables(referenceNumber),
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(mockApplication),
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        delete res.locals.application;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, () => {
        get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });

  describe('post', () => {
    const validBody = {
      [SERVICE_DESCRIPTION]: mockApplication.exportContract.agent.service[SERVICE_DESCRIPTION],
      [IS_CHARGING]: mockApplication.exportContract.agent.service[IS_CHARGING],
    };

    describe('when there are validation errors', () => {
      it('should NOT call mapAndSave.exportContractAgentService with data from constructPayload function and application', async () => {
        req.body = {};

        await post(req, res);

        expect(mapAndSave.exportContractAgentService).toHaveBeenCalledTimes(0);
      });

      it('should render template with validation errors and submitted values', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS,
            BACK_LINK: req.headers.referer,
            HTML_FLAGS,
          }),
          ...pageVariables(referenceNumber),
          userName: getUserNameFromSession(req.session.user),
          submittedValues: sanitiseData(payload),
          validationErrors: generateValidationErrors(payload),
        };

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
      });
    });

    describe('when there are no validation errors', () => {
      it('should call mapAndSave.exportContractAgentService with data from constructPayload function and application', async () => {
        req.body = validBody;

        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        expect(mapAndSave.exportContractAgentService).toHaveBeenCalledTimes(1);

        expect(mapAndSave.exportContractAgentService).toHaveBeenCalledWith(payload, res.locals.application);
      });

      it(`should redirect to ${AGENT_CHARGES} when ${IS_CHARGING} is true`, async () => {
        req.body = {
          ...validBody,
          [IS_CHARGING]: 'true',
        };

        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${referenceNumber}${AGENT_CHARGES}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS} when ${IS_CHARGING} is false`, async () => {
        req.body = {
          ...validBody,
          [IS_CHARGING]: 'false',
        };

        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });
    });

    describe(`when ${IS_CHARGING} is true`, () => {
      it(`should redirect to ${AGENT_CHARGES}`, async () => {
        req.body = {
          ...validBody,
          [IS_CHARGING]: 'true',
        };

        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${referenceNumber}${AGENT_CHARGES}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });
    });

    describe(`when ${IS_CHARGING} is true and the url's last substring is 'change'`, () => {
      it(`should redirect to ${AGENT_CHARGES_CHANGE}`, async () => {
        req.body = {
          ...validBody,
          [IS_CHARGING]: 'true',
        };

        req.originalUrl = AGENT_CHARGES_CHANGE;

        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${referenceNumber}${AGENT_CHARGES_CHANGE}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });
    });

    describe(`when ${IS_CHARGING} is false and the url's last substring is 'change'`, () => {
      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
        req.body = {
          ...validBody,
          [IS_CHARGING]: 'false',
        };

        req.originalUrl = AGENT_SERVICE_CHANGE;

        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });
    });

    describe(`when ${IS_CHARGING} is true and the url's last substring is 'check-and-change'`, () => {
      it(`should redirect to ${AGENT_CHARGES_CHECK_AND_CHANGE}`, async () => {
        req.body = {
          ...validBody,
          [IS_CHARGING]: 'true',
        };

        req.originalUrl = AGENT_SERVICE_CHECK_AND_CHANGE;

        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${referenceNumber}${AGENT_CHARGES_CHECK_AND_CHANGE}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });
    });

    describe(`when ${IS_CHARGING} is false and the url's last substring is 'check-and-change'`, () => {
      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
        req.body = {
          ...validBody,
          [IS_CHARGING]: 'false',
        };

        req.originalUrl = AGENT_SERVICE_CHECK_AND_CHANGE;

        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
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

    describe('when mapAndSave.exportContractAgentService does not return a true boolean', () => {
      beforeEach(() => {
        req.body = validBody;
        const mapAndSaveSpy = jest.fn(() => Promise.resolve(false));

        mapAndSave.exportContractAgentService = mapAndSaveSpy;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when mapAndSave.exportContractAgentService returns an error', () => {
      beforeEach(() => {
        req.body = validBody;
        const mapAndSaveSpy = mockSpyPromiseRejection;

        mapAndSave.exportContractAgentService = mapAndSaveSpy;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
