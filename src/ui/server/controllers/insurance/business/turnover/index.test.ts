import { PAGES } from '../../../../content-strings';
import { pageVariables, get, post, TEMPLATE, FIELD_IDS } from '.';
import { TEMPLATES, ROUTES } from '../../../../constants';
import BUSINESS_FIELD_IDS from '../../../../constants/field-ids/insurance/business';
import { FIELDS } from '../../../../content-strings/fields/insurance/your-business';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import constructPayload from '../../../../helpers/construct-payload';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import generateValidationErrors from './validation';
import mapAndSave from '../map-and-save/turnover';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication } from '../../../../test-mocks';

const { FINANCIAL_YEAR_END_DATE, ESTIMATED_ANNUAL_TURNOVER, PERCENTAGE_TURNOVER } = BUSINESS_FIELD_IDS.TURNOVER;

const { TURNOVER } = PAGES.INSURANCE.EXPORTER_BUSINESS;
const { TURNOVER: TURNOVER_TEMPLATE } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

const {
  INSURANCE_ROOT,
  EXPORTER_BUSINESS: EXPORTER_BUSINESS_ROUTES,
  CHECK_YOUR_ANSWERS: { YOUR_BUSINESS: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = ROUTES.INSURANCE;

const { TURNOVER_CURRENCY, TURNOVER_SAVE_AND_BACK, CREDIT_CONTROL, CHECK_YOUR_ANSWERS, TURNOVER_CHANGE, TURNOVER_CHECK_AND_CHANGE } = EXPORTER_BUSINESS_ROUTES;

const { TURNOVER: TURNOVER_FIELDS } = FIELDS;

jest.mock('../map-and-save/turnover');

describe('controllers/insurance/business/turnover', () => {
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
      expect(TEMPLATE).toEqual(TURNOVER_TEMPLATE);
    });
  });

  describe('FIELD_IDS', () => {
    it('should have the correct FIELD_IDS', () => {
      expect(FIELD_IDS).toEqual([FINANCIAL_YEAR_END_DATE, ESTIMATED_ANNUAL_TURNOVER, PERCENTAGE_TURNOVER]);
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
        PROVIDE_ALTERNATIVE_CURRENCY_URL: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${TURNOVER_CURRENCY}`,
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${TURNOVER_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render the turnover template with correct variables', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(TURNOVER_TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: TURNOVER,
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
    mapAndSave.turnover = jest.fn(() => Promise.resolve(true));

    describe('when there are validation errors', () => {
      it('should render template with validation errors and submitted values', async () => {
        req.body = {};

        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        const validationErrors = generateValidationErrors(payload);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: TURNOVER,
            BACK_LINK: req.headers.referer,
          }),
          userName: getUserNameFromSession(req.session.user),
          ...pageVariables(mockApplication.referenceNumber),
          validationErrors,
          application: mapApplicationToFormFields(mockApplication),
          submittedValues: sanitiseData(payload),
        });
      });
    });

    describe('when there are no validation errors', () => {
      const body = {
        [ESTIMATED_ANNUAL_TURNOVER]: '5',
        [PERCENTAGE_TURNOVER]: '3',
      };

      it('should redirect to next page', async () => {
        req.body = body;

        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${CREDIT_CONTROL}`;
        expect(res.redirect).toHaveBeenCalledWith(expected);
      });

      it('should call mapAndSave.turnover once with data from constructPayload and application', async () => {
        req.body = {
          ...body,
          injection: 1,
        };

        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        expect(mapAndSave.turnover).toHaveBeenCalledTimes(1);

        expect(mapAndSave.turnover).toHaveBeenCalledWith(payload, mockApplication);
      });

      describe("when the url's last substring is `change`", () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
          req.body = body;

          req.originalUrl = TURNOVER_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${CHECK_YOUR_ANSWERS}`;
          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe("when the url's last substring is `check-and-change`", () => {
        it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
          req.body = body;

          req.originalUrl = TURNOVER_CHECK_AND_CHANGE;

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
