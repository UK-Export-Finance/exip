import { PAGES } from '../../../../content-strings';
import { pageVariables, get, TEMPLATE } from '.';
import { Request, Response } from '../../../../../types';
import { TEMPLATES, ROUTES, FIELD_IDS } from '../../../../constants';
import { FIELDS } from '../../../../content-strings/fields/insurance/your-business';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import chooseDateFormat from '../../../../helpers/date/choose-date-format';
import { mockReq, mockRes, mockApplication } from '../../../../test-mocks';

const { EXPORTER_BUSINESS } = FIELD_IDS.INSURANCE;
const { FINANCIAL_YEAR_END_DATE } = EXPORTER_BUSINESS.TURNOVER;

const { TURNOVER } = PAGES.INSURANCE.EXPORTER_BUSINESS;
const { TURNOVER: TURNOVER_TEMPLATE } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

const { INSURANCE_ROOT, EXPORTER_BUSINESS: EXPORTER_BUSINESS_ROUTES } = ROUTES.INSURANCE;

const { TURNOVER_ROOT } = EXPORTER_BUSINESS_ROUTES;

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
        },
        POST_ROUTES: {
          NATURE_OF_BUSINESS: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${TURNOVER_ROOT}`,
          SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${TURNOVER_ROOT}`,
        },
      };

      expect(result).toEqual(expected);
    });
  });

  describe('get', () => {
    describe('when the application exists', () => {
      describe(`when there is ${FINANCIAL_YEAR_END_DATE}`, () => {
        it('should render the nature-of-business template with correct variables', () => {
          res.locals.application = mockApplication;

          const submittedValues = {
            [FINANCIAL_YEAR_END_DATE]: chooseDateFormat(mockApplication.exporterCompany[FINANCIAL_YEAR_END_DATE], 'd MMMM'),
          };

          get(req, res);

          expect(res.render).toHaveBeenCalledWith(TURNOVER_TEMPLATE, {
            ...insuranceCorePageVariables({
              PAGE_CONTENT_STRINGS: TURNOVER,
              BACK_LINK: req.headers.referer,
            }),
            submittedValues,
            ...pageVariables(mockApplication.referenceNumber),
          });
        });
      });

      describe(`when there is no ${FINANCIAL_YEAR_END_DATE}`, () => {
        it('should render the nature-of-business template with correct variables', () => {
          const applicationWithoutYearEndDate = mockApplication;
          applicationWithoutYearEndDate.exporterCompany[FINANCIAL_YEAR_END_DATE] = null;
          res.locals.application = applicationWithoutYearEndDate;

          const submittedValues = {
            [FINANCIAL_YEAR_END_DATE]: null,
          };

          get(req, res);

          expect(res.render).toHaveBeenCalledWith(TURNOVER_TEMPLATE, {
            ...insuranceCorePageVariables({
              PAGE_CONTENT_STRINGS: TURNOVER,
              BACK_LINK: req.headers.referer,
            }),
            submittedValues,
            ...pageVariables(applicationWithoutYearEndDate.referenceNumber),
          });
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
});
