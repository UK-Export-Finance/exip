import { FIELD_IDS, PAGE_CONTENT_STRINGS, TEMPLATE, pageVariables, get, post } from '.';
import { PAGES } from '../../../../content-strings';
import { POLICY_FIELDS } from '../../../../content-strings/fields/insurance/policy';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { Application, Request, Response } from '../../../../../types';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import mapAndSave from '../map-and-save/nominated-loss-payee';
import { mockReq, mockRes, mockApplication, mockLossPayeeDetails } from '../../../../test-mocks';

const { NAME, LOCATION, IS_LOCATED_INTERNATIONALLY, IS_LOCATED_IN_UK } = POLICY_FIELD_IDS.LOSS_PAYEE_DETAILS;

const {
  INSURANCE_ROOT,
  PROBLEM_WITH_SERVICE,
  POLICY: {
    CHECK_YOUR_ANSWERS,
    LOSS_PAYEE_FINANCIAL_UK_ROOT,
    LOSS_PAYEE_FINANCIAL_INTERNATIONAL_ROOT,
    LOSS_PAYEE_DETAILS_CHANGE,
    LOSS_PAYEE_CHECK_AND_CHANGE,
    LOSS_PAYEE_DETAILS_SAVE_AND_BACK,
  },
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY: CHECK_AND_CHANGE_ROUTE },
} = INSURANCE_ROUTES;

const { LOSS_PAYEE_DETAILS } = POLICY_FIELDS;

const { referenceNumber } = mockApplication;

describe('controllers/insurance/policy/loss-payee-details', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('FIELD_IDS', () => {
    it('should have the correct FIELD_IDS', () => {
      const expected = [NAME, LOCATION];

      expect(FIELD_IDS).toEqual(expected);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.POLICY.LOSS_PAYEE_DETAILS);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.POLICY.LOSS_PAYEE_DETAILS);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(referenceNumber);

      const expected = {
        FIELDS: {
          NAME: {
            ID: NAME,
            ...LOSS_PAYEE_DETAILS[NAME],
          },
          LOCATION: {
            ID: LOCATION,
            ...LOSS_PAYEE_DETAILS[LOCATION],
          },
          IS_LOCATED_IN_UK: {
            ID: IS_LOCATED_IN_UK,
          },
          IS_LOCATED_INTERNATIONALLY: {
            ID: IS_LOCATED_INTERNATIONALLY,
          },
        },
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${LOSS_PAYEE_DETAILS_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      const mappedApplication = mapApplicationToFormFields(mockApplication) as Application;

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(referenceNumber),
        userName: getUserNameFromSession(req.session.user),
        submittedValues: mappedApplication?.nominatedLossPayee,
      });
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
    const validBody = mockLossPayeeDetails;

    beforeEach(() => {
      mapAndSave.nominatedLossPayee = jest.fn(() => Promise.resolve(true));
    });

    describe('when there are validation errors', () => {
      it('should render template with validation errors', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(mockApplication.referenceNumber),
          userName: getUserNameFromSession(req.session.user),
          submittedValues: payload,
          validationErrors: generateValidationErrors(payload),
        };

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
      });
    });

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

      it('should call mapAndSave.nominatedLossPayee once with data from constructPayload function', async () => {
        req.body = validBody;

        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        expect(mapAndSave.nominatedLossPayee).toHaveBeenCalledTimes(1);

        expect(mapAndSave.nominatedLossPayee).toHaveBeenCalledWith(payload, mockApplication);
      });

      describe("when the url's last substring is `change`", () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
          req.originalUrl = LOSS_PAYEE_DETAILS_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${CHECK_YOUR_ANSWERS}`;
          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe("when the url's last substring is `check-and-change`", () => {
        it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
          req.originalUrl = LOSS_PAYEE_CHECK_AND_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${CHECK_AND_CHANGE_ROUTE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe(`when ${LOCATION} is ${IS_LOCATED_IN_UK}`, () => {
        it(`should redirect to ${LOSS_PAYEE_FINANCIAL_UK_ROOT}`, async () => {
          req.body = {
            ...validBody,
            [LOCATION]: IS_LOCATED_IN_UK,
          };

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${req.params.referenceNumber}${LOSS_PAYEE_FINANCIAL_UK_ROOT}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe(`when ${LOCATION} is ${IS_LOCATED_INTERNATIONALLY}`, () => {
        it(`should redirect to ${LOSS_PAYEE_FINANCIAL_INTERNATIONAL_ROOT}`, async () => {
          req.body[LOCATION] = IS_LOCATED_INTERNATIONALLY;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${req.params.referenceNumber}${LOSS_PAYEE_FINANCIAL_INTERNATIONAL_ROOT}`;

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
  });
});
