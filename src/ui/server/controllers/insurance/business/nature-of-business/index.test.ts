import { PAGES } from '../../../../content-strings';
import { pageVariables, get, TEMPLATE, post } from '.';
import { Request, Response } from '../../../../../types';
import { TEMPLATES, ROUTES, FIELD_IDS } from '../../../../constants';
import { FIELDS } from '../../../../content-strings/fields/insurance/your-business';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import generateValidationErrors from './validation';
import { mockReq, mockRes, mockApplication } from '../../../../test-mocks';
import mapAndSave from '../map-and-save';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';

const { EXPORTER_BUSINESS } = FIELD_IDS.INSURANCE;
const { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_INTERNATIONAL, EMPLOYEES_UK } = EXPORTER_BUSINESS.NATURE_OF_YOUR_BUSINESS;

const { NATURE_OF_YOUR_BUSINESS } = PAGES.INSURANCE.EXPORTER_BUSINESS;
const { NATURE_OF_YOUR_BUSINESS: NATURE_OF_YOUR_BUSINESS_TEMPLATE } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

const {
  INSURANCE_ROOT,
  EXPORTER_BUSINESS: EXPORTER_BUSINESS_ROUTES,
  CHECK_YOUR_ANSWERS: { YOUR_BUSINESS: CHECK_AND_CHANGE_ROUTE },
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

jest.mock('../map-and-save');

describe('controllers/insurance/business/nature-of-business', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplication;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(NATURE_OF_YOUR_BUSINESS_TEMPLATE);
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
    describe('when the application exists', () => {
      it('should render the nature-of-business template with correct variables', () => {
        res.locals.application = mockApplication;

        get(req, res);

        expect(res.render).toHaveBeenCalledWith(NATURE_OF_YOUR_BUSINESS_TEMPLATE, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: NATURE_OF_YOUR_BUSINESS,
            BACK_LINK: req.headers.referer,
          }),
          application: mapApplicationToFormFields(mockApplication),
          ...pageVariables(mockApplication.referenceNumber),
        });
      });
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        res.locals = { csrfToken: '1234' };
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, () => {
        get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });
  });

  describe('post', () => {
    mapAndSave.natureOfBusiness = jest.fn(() => Promise.resolve(true));

    describe('when there are validation errors', () => {
      it('should render template with validation errors', async () => {
        req.body = {};

        const submittedValues = {
          [GOODS_OR_SERVICES]: req.body[GOODS_OR_SERVICES],
        };

        await post(req, res);

        const validationErrors = generateValidationErrors(req.body);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: NATURE_OF_YOUR_BUSINESS,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(mockApplication.referenceNumber),
          validationErrors,
          application: mapApplicationToFormFields(mockApplication),
          submittedValues,
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

      it('should call mapAndSave.natureOfBusiness once with natureOfBusiness and application', async () => {
        req.body = body;

        await post(req, res);

        expect(mapAndSave.natureOfBusiness).toHaveBeenCalledTimes(1);

        expect(mapAndSave.natureOfBusiness).toHaveBeenCalledWith(req.body, mockApplication);
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

    describe('when application does not exist', () => {
      beforeEach(() => {
        res.locals = { csrfToken: '1234' };
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });
  });
});
