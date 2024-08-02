import { pageVariables, PAGE_CONTENT_STRINGS, TEMPLATE, FIELD_IDS, get, post } from '.';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { EXPORT_CONTRACT as EXPORT_CONTRACT_FIELD_IDS } from '../../../../constants/field-ids/insurance/export-contract';
import { PARTIALS as PARTIAL_TEMPLATES } from '../../../../constants/templates/partials';
import { PAGES } from '../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import mapAndSave from '../map-and-save/export-contract';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockExportContract, referenceNumber } from '../../../../test-mocks';

const {
  INSURANCE_ROOT,
  EXPORT_CONTRACT: { ABOUT_GOODS_OR_SERVICES },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const {
  HOW_WAS_THE_CONTRACT_AWARDED: { AWARD_METHOD, OTHER_AWARD_METHOD },
} = EXPORT_CONTRACT_FIELD_IDS;

const {
  INSURANCE: {
    EXPORT_CONTRACT: {
      HOW_WAS_THE_CONTRACT_AWARDED: { CONDITIONAL_OTHER_METHOD_HTML },
    },
  },
} = PARTIAL_TEMPLATES;

describe('controllers/insurance/export-contract/how-was-the-contract-awarded', () => {
  let req: Request;
  let res: Response;

  jest.mock('../map-and-save/export-contract');

  mapAndSave.exportContract = jest.fn(() => Promise.resolve(true));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.EXPORT_CONTRACT.HOW_WAS_THE_CONTRACT_AWARDED);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.EXPORT_CONTRACT.HOW_WAS_THE_CONTRACT_AWARDED);
    });
  });

  describe('FIELD_IDS', () => {
    it('should have the correct FIELD_IDS', () => {
      const expected = [AWARD_METHOD, OTHER_AWARD_METHOD];

      expect(FIELD_IDS).toEqual(expected);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables();

      const expected = {
        FIELDS: {
          AWARD_METHOD: {
            ID: AWARD_METHOD,
            ...FIELDS.HOW_WAS_THE_CONTRACT_AWARDED[AWARD_METHOD],
          },
          OTHER_AWARD_METHOD: {
            ID: OTHER_AWARD_METHOD,
            ...FIELDS.HOW_WAS_THE_CONTRACT_AWARDED[OTHER_AWARD_METHOD],
          },
        },
        SAVE_AND_BACK_URL: '#',
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
        }),
        ...pageVariables(),
        CONDITIONAL_OTHER_METHOD_HTML,
        userName: getUserNameFromSession(req.session.user),
        submittedValues: mockExportContract,
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
      [AWARD_METHOD]: mockExportContract[AWARD_METHOD].DB_ID,
    };

    describe('when there are validation errors', () => {
      it('should render template with validation errors', () => {
        post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(),
          CONDITIONAL_OTHER_METHOD_HTML,
          userName: getUserNameFromSession(req.session.user),
          submittedValues: sanitiseData(payload),
          validationErrors: generateValidationErrors(payload),
        };

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
      });
    });

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

      it('should call mapAndSave.exportContract with data from constructPayload function and application', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        expect(mapAndSave.exportContract).toHaveBeenCalledTimes(1);

        const expectedValidationErrors = false;

        expect(mapAndSave.exportContract).toHaveBeenCalledWith(payload, res.locals.application, expectedValidationErrors);
      });

      it(`should redirect to ${ABOUT_GOODS_OR_SERVICES}`, async () => {
        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES}`;

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

    describe('when mapAndSave.exportContract does not return a true boolean', () => {
      beforeEach(() => {
        req.body = validBody;
        const mapAndSaveSpy = jest.fn(() => Promise.resolve(false));

        mapAndSave.exportContract = mapAndSaveSpy;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when mapAndSave.exportContract returns an error', () => {
      beforeEach(() => {
        req.body = validBody;
        const mapAndSaveSpy = jest.fn(() => Promise.reject(new Error('mock')));

        mapAndSave.exportContract = mapAndSaveSpy;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
