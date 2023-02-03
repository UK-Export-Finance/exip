import { PAGES } from '../../../../content-strings';
import { pageVariables, get, post, TEMPLATE } from '.';
import { Request, Response } from '../../../../../types';
import { TEMPLATES, ROUTES, FIELD_IDS } from '../../../../constants';
import { FIELDS } from '../../../../content-strings/fields/insurance/your-business';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import { mockReq, mockRes, mockApplication } from '../../../../test-mocks';
import generateValidationErrors from './validation';

const { EXPORTER_BUSINESS } = FIELD_IDS.INSURANCE;
const { FINANCIAL_YEAR_END_DATE, ESTIMATED_ANNUAL_TURNOVER, PERCENTAGE_TURNOVER } = EXPORTER_BUSINESS.TURNOVER;

const { TURNOVER } = PAGES.INSURANCE.EXPORTER_BUSINESS;
const { TURNOVER: TURNOVER_TEMPLATE } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

const { INSURANCE_ROOT, EXPORTER_BUSINESS: EXPORTER_BUSINESS_ROUTES } = ROUTES.INSURANCE;

const { TURNOVER_ROOT, BROKER_ROOT } = EXPORTER_BUSINESS_ROUTES;

const { TURNOVER: TURNOVER_FIELDS } = FIELDS;

describe('controllers/insurance/business/turnover', () => {
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
      expect(TEMPLATE).toEqual(TURNOVER_TEMPLATE);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(mockApplication.referenceNumber);

      const expected = {
        FIELDS: {
          FINANCIAL_YEAR_END_DATE: {
            ID: FINANCIAL_YEAR_END_DATE,
            ...TURNOVER_FIELDS[FINANCIAL_YEAR_END_DATE],
          },
          ESTIMATED_ANNUAL_TURNOVER: {
            ID: ESTIMATED_ANNUAL_TURNOVER,
            ...TURNOVER_FIELDS[ESTIMATED_ANNUAL_TURNOVER],
          },
          PERCENTAGE_TURNOVER: {
            ID: PERCENTAGE_TURNOVER,
            ...TURNOVER_FIELDS[PERCENTAGE_TURNOVER],
          },
        },
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${TURNOVER_ROOT}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('get', () => {
    describe('when the application exists', () => {
      it('should render the nature-of-business template with correct variables', () => {
        res.locals.application = mockApplication;

        get(req, res);

        expect(res.render).toHaveBeenCalledWith(TURNOVER_TEMPLATE, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: TURNOVER,
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
    describe('when there are validation errors', () => {
      it('should render template with validation errors', async () => {
        req.body = {};

        const submittedValues = {
          [ESTIMATED_ANNUAL_TURNOVER]: req.body[ESTIMATED_ANNUAL_TURNOVER],
          [PERCENTAGE_TURNOVER]: req.body[PERCENTAGE_TURNOVER],
        };

        await post(req, res);

        const validationErrors = generateValidationErrors(req.body);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: TURNOVER,
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
      it('should redirect to next page', async () => {
        req.body = {
          [ESTIMATED_ANNUAL_TURNOVER]: '5',
          [PERCENTAGE_TURNOVER]: '3',
        };

        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${BROKER_ROOT}`;
        expect(res.redirect).toHaveBeenCalledWith(expected);
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
