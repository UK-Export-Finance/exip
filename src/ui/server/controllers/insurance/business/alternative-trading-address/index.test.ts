import { PAGES } from '../../../../content-strings';
import { pageVariables, get, TEMPLATE, post, FIELD_IDS, MAXIMUM } from '.';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import BUSINESS_FIELD_IDS from '../../../../constants/field-ids/insurance/business';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { FIELDS } from '../../../../content-strings/fields/insurance/your-business';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication } from '../../../../test-mocks';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import generateMultipleFieldHtml from '../../../../helpers/generate-multiple-field-html';

const {
  INSURANCE_ROOT,
  EXPORTER_BUSINESS: { NATURE_OF_BUSINESS_ROOT },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const { ALTERNATIVE_TRADING_ADDRESS } = BUSINESS_FIELD_IDS;

const {
  COMPANIES_HOUSE: { COMPANY_ADDRESS },
} = INSURANCE_FIELD_IDS;

describe('controllers/insurance/business/alternative-trading-address', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.EXPORTER_BUSINESS.ALTERNATIVE_TRADING_ADDRESS);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELDS: {
          ALTERNATIVE_TRADING_ADDRESS: {
            ID: ALTERNATIVE_TRADING_ADDRESS,
            ...FIELDS.ALTERNATIVE_TRADING_ADDRESS[ALTERNATIVE_TRADING_ADDRESS],
            MAXIMUM,
          },
          REGISTERED_OFFICE_ADDRESS: {
            ID: COMPANY_ADDRESS,
            ...FIELDS.ALTERNATIVE_TRADING_ADDRESS[COMPANY_ADDRESS],
          },
        },
        SAVE_AND_BACK_URL: '',
      };

      expect(pageVariables).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      const { company } = mockApplication;

      const addressHtml = generateMultipleFieldHtml(company[COMPANY_ADDRESS]);

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.EXPORTER_BUSINESS.ALTERNATIVE_TRADING_ADDRESS,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
        addressHtml,
        ...pageVariables,
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
    describe('when there are validation errors', () => {
      it('should render template with validation errors and submitted values', async () => {
        req.body = {};

        await post(req, res);

        const { company } = mockApplication;

        const addressHtml = generateMultipleFieldHtml(company[COMPANY_ADDRESS]);

        const payload = constructPayload(req.body, FIELD_IDS);

        const validationErrors = generateValidationErrors(payload);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: PAGES.INSURANCE.EXPORTER_BUSINESS.ALTERNATIVE_TRADING_ADDRESS,
            BACK_LINK: req.headers.referer,
          }),
          userName: getUserNameFromSession(req.session.user),
          addressHtml,
          ...pageVariables,
          validationErrors,
          application: mapApplicationToFormFields(mockApplication),
          submittedValues: payload,
        });
      });
    });

    describe('when there are no validation errors', () => {
      it('should redirect to next page', () => {
        req.body = {
          [ALTERNATIVE_TRADING_ADDRESS]: 'test',
        };

        post(req, res);

        const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${NATURE_OF_BUSINESS_ROOT}`;
        expect(res.redirect).toHaveBeenCalledWith(expected);
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
