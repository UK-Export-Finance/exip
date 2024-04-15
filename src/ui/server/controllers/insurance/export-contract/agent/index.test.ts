import { pageVariables, FIELD_ID, ERROR_MESSAGE, PAGE_CONTENT_STRINGS, TEMPLATE, HTML_FLAGS, get, post } from '.';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import EXPORT_CONTRACT_FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';
import { ERROR_MESSAGES, PAGES } from '../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/export-contract';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';
import mapAndSave from '../map-and-save/export-contract-agent';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication, referenceNumber } from '../../../../test-mocks';

const {
  INSURANCE_ROOT,
  PROBLEM_WITH_SERVICE,
  EXPORT_CONTRACT: { AGENT_DETAILS, AGENT_SAVE_AND_BACK, AGENT_CHANGE, AGENT_DETAILS_CHANGE, CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const { USING_AGENT } = EXPORT_CONTRACT_FIELD_IDS;

describe('controllers/insurance/export-contract/agent', () => {
  let req: Request;
  let res: Response;

  jest.mock('../map-and-save/export-contract-agent');

  mapAndSave.exportContractAgent = jest.fn(() => Promise.resolve(true));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('FIELD_ID', () => {
    it('should have the correct FIELD_ID', () => {
      expect(FIELD_ID).toEqual(USING_AGENT);
    });
  });

  describe('ERROR_MESSAGE', () => {
    it('should have the correct error message', () => {
      const expected = ERROR_MESSAGES.INSURANCE.EXPORT_CONTRACT[FIELD_ID].IS_EMPTY;

      expect(ERROR_MESSAGE).toEqual(expected);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.EXPORT_CONTRACT.AGENT);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.SHARED_PAGES.SINGLE_RADIO);
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
        FIELD: {
          ID: FIELD_ID,
          ...FIELDS.PRIVATE_MARKET[FIELD_ID],
        },
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${AGENT_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      const expectedVariables = {
        ...singleInputPageVariables({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK: req.headers.referer, HTML_FLAGS }),
        ...pageVariables(referenceNumber),
        userName: getUserNameFromSession(req.session.user),
        FIELD_HINT: PAGE_CONTENT_STRINGS.HINT,
        applicationAnswer: mockApplication.exportContract.agent[FIELD_ID],
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
      [FIELD_ID]: 'false',
    };

    describe('when there are validation errors', () => {
      it('should render template with validation errors and submitted values', async () => {
        req.body = {};

        await post(req, res);

        const payload = constructPayload(req.body, [FIELD_ID]);

        const validationErrors = generateValidationErrors(payload, FIELD_ID, ERROR_MESSAGE);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...singleInputPageVariables({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK: req.headers.referer, HTML_FLAGS }),
          ...pageVariables(referenceNumber),
          userName: getUserNameFromSession(req.session.user),
          FIELD_HINT: PAGE_CONTENT_STRINGS.HINT,
          validationErrors,
        });
      });
    });

    describe('when there are no validation errors', () => {
      it('should call mapAndSave.exportContractAgent with data from constructPayload function and application', async () => {
        req.body = validBody;

        await post(req, res);

        const payload = constructPayload(req.body, [FIELD_ID]);

        expect(mapAndSave.exportContractAgent).toHaveBeenCalledTimes(1);

        expect(mapAndSave.exportContractAgent).toHaveBeenCalledWith(payload, res.locals.application);
      });

      describe('when the answer is false', () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
          req.body = {
            [FIELD_ID]: 'false',
          };

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${req.params.referenceNumber}${CHECK_YOUR_ANSWERS}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe('when the answer is true', () => {
        it(`should redirect to ${AGENT_DETAILS}`, async () => {
          req.body = {
            [FIELD_ID]: 'true',
          };

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${req.params.referenceNumber}${AGENT_DETAILS}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe("when the answer is true and the url's last substring is `change`", () => {
        it(`should redirect to ${AGENT_DETAILS_CHANGE}`, async () => {
          req.body = {
            [FIELD_ID]: 'true',
          };

          req.originalUrl = AGENT_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${AGENT_DETAILS_CHANGE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe("when the answer is false and the url's last substring is `change`", () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
          req.body = {
            [FIELD_ID]: 'false',
          };

          req.originalUrl = AGENT_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

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
