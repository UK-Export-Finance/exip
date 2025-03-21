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
import { ObjectType, Request, ResponseInsurance } from '../../../../../types';
import { mockReq, mockResInsurance, mockExportContract, mockSpyPromiseRejection, referenceNumber } from '../../../../test-mocks';

const {
  INSURANCE_ROOT,
  EXPORT_CONTRACT: {
    ABOUT_GOODS_OR_SERVICES,
    CHECK_YOUR_ANSWERS,
    HOW_WAS_THE_CONTRACT_AWARDED_CHANGE,
    HOW_WAS_THE_CONTRACT_AWARDED_CHECK_AND_CHANGE,
    HOW_WAS_THE_CONTRACT_AWARDED_SAVE_AND_BACK: SAVE_AND_BACK,
  },
  CHECK_YOUR_ANSWERS: { EXPORT_CONTRACT: CHECK_AND_CHANGE_ROUTE },
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
  let res: ResponseInsurance;

  jest.mock('../map-and-save/export-contract');

  mapAndSave.exportContract = jest.fn(() => Promise.resolve(true));

  beforeEach(() => {
    req = mockReq();
    res = mockResInsurance();
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
      const result = pageVariables(referenceNumber);

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
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${SAVE_AND_BACK}`,
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
        ...pageVariables(referenceNumber),
        CONDITIONAL_OTHER_METHOD_HTML,
        userName: getUserNameFromSession(req.session.user),
        submittedValues: mockExportContract,
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
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

        const sanitised = sanitiseData(payload) as ObjectType;

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(referenceNumber),
          CONDITIONAL_OTHER_METHOD_HTML,
          userName: getUserNameFromSession(req.session.user),
          submittedValues: {
            ...sanitised,
            [AWARD_METHOD]: {
              id: sanitised[AWARD_METHOD],
            },
          },
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

      describe("when the url's last substring is `change`", () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
          req.originalUrl = HOW_WAS_THE_CONTRACT_AWARDED_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe("when the url's last substring is `check-and-change`", () => {
        it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
          req.originalUrl = HOW_WAS_THE_CONTRACT_AWARDED_CHECK_AND_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
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
        const mapAndSaveSpy = mockSpyPromiseRejection;

        mapAndSave.exportContract = mapAndSaveSpy;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
