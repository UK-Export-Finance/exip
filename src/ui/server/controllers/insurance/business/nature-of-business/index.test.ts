import { PAGES } from '../../../../content-strings';
import { pageVariables, get, TEMPLATE, post, FIELD_IDS } from '.';
import { TEMPLATES, ROUTES } from '../../../../constants';
import BUSINESS_FIELD_IDS from '../../../../constants/field-ids/insurance/business';
import { FIELDS } from '../../../../content-strings/fields/insurance/your-business';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import mapAndSave from '../map-and-save/nature-of-business';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication } from '../../../../test-mocks';

const { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_INTERNATIONAL, EMPLOYEES_UK } = BUSINESS_FIELD_IDS.NATURE_OF_YOUR_BUSINESS;

const { NATURE_OF_YOUR_BUSINESS } = PAGES.INSURANCE.EXPORTER_BUSINESS;
const { NATURE_OF_YOUR_BUSINESS: NATURE_OF_YOUR_BUSINESS_TEMPLATE } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

const {
  INSURANCE_ROOT,
  EXPORTER_BUSINESS: EXPORTER_BUSINESS_ROUTES,
  CHECK_YOUR_ANSWERS: { YOUR_BUSINESS: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = ROUTES.INSURANCE;

const {
  NATURE_OF_BUSINESS_ROOT,
  TURNOVER_ROOT,
  NATURE_OF_BUSINESS_SAVE_AND_BACK,
  CHECK_YOUR_ANSWERS,
  NATURE_OF_BUSINESS_CHANGE,
  NATURE_OF_BUSINESS_CHECK_AND_CHANGE,
} = EXPORTER_BUSINESS_ROUTES;

const { NATURE_OF_YOUR_BUSINESS: NATURE_OF_YOUR_BUSINESS_FIELDS } = FIELDS;

const MAXIMUM = 1000;

jest.mock('../map-and-save/nature-of-business');

describe('controllers/insurance/business/nature-of-business', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(NATURE_OF_YOUR_BUSINESS_TEMPLATE);
    });
  });

  describe('FIELD_IDS', () => {
    it('should have the correct FIELD_IDS', () => {
      expect(FIELD_IDS).toEqual([GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK, EMPLOYEES_INTERNATIONAL]);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(mockApplication.referenceNumber);

      const expected = {
        FIELDS: {
          GOODS_OR_SERVICES: {
            ID: GOODS_OR_SERVICES,
            ...NATURE_OF_YOUR_BUSINESS_FIELDS[GOODS_OR_SERVICES],
            MAXIMUM,
          },
          YEARS_EXPORTING: {
            ID: YEARS_EXPORTING,
            ...NATURE_OF_YOUR_BUSINESS_FIELDS[YEARS_EXPORTING],
          },
          EMPLOYEES_UK: {
            ID: EMPLOYEES_UK,
            ...NATURE_OF_YOUR_BUSINESS_FIELDS[EMPLOYEES_UK],
          },
          EMPLOYEES_INTERNATIONAL: {
            ID: EMPLOYEES_INTERNATIONAL,
            ...NATURE_OF_YOUR_BUSINESS_FIELDS[EMPLOYEES_INTERNATIONAL],
          },
        },
        POST_ROUTES: {
          NATURE_OF_BUSINESS: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${NATURE_OF_BUSINESS_ROOT}`,
          SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${NATURE_OF_BUSINESS_SAVE_AND_BACK}`,
        },
      };

      expect(result).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render the nature-of-business template with correct variables', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(NATURE_OF_YOUR_BUSINESS_TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: NATURE_OF_YOUR_BUSINESS,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(mockApplication),
        ...pageVariables(mockApplication.referenceNumber),
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
    mapAndSave.natureOfBusiness = jest.fn(() => Promise.resolve(true));

    describe('when there are validation errors', () => {
      it('should render template with validation errors and submitted values', async () => {
        req.body = {};

        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        const validationErrors = generateValidationErrors(payload);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: NATURE_OF_YOUR_BUSINESS,
            BACK_LINK: req.headers.referer,
          }),
          userName: getUserNameFromSession(req.session.user),
          ...pageVariables(mockApplication.referenceNumber),
          validationErrors,
          application: mapApplicationToFormFields(mockApplication),
          submittedValues: payload,
        });
      });
    });

    describe('when there are no validation errors', () => {
      const body = {
        [GOODS_OR_SERVICES]: 'test',
        [YEARS_EXPORTING]: '5',
        [EMPLOYEES_UK]: '3',
        [EMPLOYEES_INTERNATIONAL]: '25',
      };

      it('should redirect to next page', async () => {
        req.body = body;

        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${TURNOVER_ROOT}`;
        expect(res.redirect).toHaveBeenCalledWith(expected);
      });

      it('should call mapAndSave.natureOfBusiness once with the data from constructPayload function and application', async () => {
        req.body = {
          ...body,
          injection: 1,
        };

        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        expect(mapAndSave.natureOfBusiness).toHaveBeenCalledTimes(1);

        expect(mapAndSave.natureOfBusiness).toHaveBeenCalledWith(payload, mockApplication);
      });

      describe("when the url's last substring is `change`", () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
          req.body = body;

          req.originalUrl = NATURE_OF_BUSINESS_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${CHECK_YOUR_ANSWERS}`;
          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe("when the url's last substring is `check-and-change`", () => {
        it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
          req.body = body;

          req.originalUrl = NATURE_OF_BUSINESS_CHECK_AND_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${CHECK_AND_CHANGE_ROUTE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        delete res.locals.application;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
