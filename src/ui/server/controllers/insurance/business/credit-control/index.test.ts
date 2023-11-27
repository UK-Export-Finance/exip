import { FIELD_ID, TEMPLATE, PAGE_VARIABLES, get, post } from '.';
import { ERROR_MESSAGES, PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import BUSINESS_FIELD_IDS from '../../../../constants/field-ids/insurance/business';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';
import mapAndSave from '../map-and-save/business';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication } from '../../../../test-mocks';

const { CREDIT_CONTROL } = BUSINESS_FIELD_IDS;

const {
  INSURANCE_ROOT,
  EXPORTER_BUSINESS: { BROKER_ROOT },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

jest.mock('../map-and-save/business');

describe('controllers/insurance/business/credit-control', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('FIELD_ID', () => {
    it('should have the correct ID', () => {
      const expected = CREDIT_CONTROL;

      expect(FIELD_ID).toEqual(expected);
    });
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELD_ID: BUSINESS_FIELD_IDS.CREDIT_CONTROL,
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.EXPORTER_BUSINESS.CREDIT_CONTROL,
        SAVE_AND_BACK_URL: '',
      };

      expect(PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.EXPORTER_BUSINESS.CREDIT_CONTROL);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...singleInputPageVariables({
          ...PAGE_VARIABLES,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
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
    mapAndSave.business = jest.fn(() => Promise.resolve(true));

    const validBody = {
      [FIELD_ID]: 'true',
    };

    describe('when there are validation errors', () => {
      it('should render template with validation errors and submitted values', async () => {
        req.body = {};

        const payload = constructPayload(req.body, [FIELD_ID]);

        await post(req, res);

        const validationErrors = generateValidationErrors(payload, FIELD_ID, ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS[FIELD_ID].IS_EMPTY);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...singleInputPageVariables({
            ...PAGE_VARIABLES,
            BACK_LINK: req.headers.referer,
          }),
          userName: getUserNameFromSession(req.session.user),
          validationErrors,
          submittedValues: payload,
        });
      });
    });

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

      it('should call mapAndSave.business once with the data from constructPayload function and application', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, [FIELD_ID]);

        expect(mapAndSave.business).toHaveBeenCalledTimes(1);

        expect(mapAndSave.business).toHaveBeenCalledWith(payload, mockApplication);
      });

      it('should redirect to next page', async () => {
        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${BROKER_ROOT}`;
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
  });
});
