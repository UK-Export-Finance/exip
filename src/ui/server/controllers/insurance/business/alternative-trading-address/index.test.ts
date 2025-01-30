import { PAGES } from '../../../../content-strings';
import { pageVariables, get, TEMPLATE, post, FIELD_IDS } from '.';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import BUSINESS_FIELD_IDS from '../../../../constants/field-ids/insurance/business';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { EXPORTER_BUSINESS_FIELDS } from '../../../../content-strings/fields/insurance/your-business';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { Request, ResponseInsurance } from '../../../../../types';
import { mockReq, mockResInsurance, mockApplication, referenceNumber } from '../../../../test-mocks';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import generateMultipleFieldHtml from '../../../../helpers/generate-multiple-field-html';
import mapAndSave from '../map-and-save/company-different-trading-address';

const {
  INSURANCE_ROOT,
  EXPORTER_BUSINESS: {
    NATURE_OF_BUSINESS_ROOT,
    ALTERNATIVE_TRADING_ADDRESS_ROOT_SAVE_AND_BACK: SAVE_AND_BACK,
    CHECK_YOUR_ANSWERS,
    ALTERNATIVE_TRADING_ADDRESS_CHANGE,
    ALTERNATIVE_TRADING_ADDRESS_CHECK_AND_CHANGE,
  },
  CHECK_YOUR_ANSWERS: { YOUR_BUSINESS: CHECK_AND_CHANGE_ROUTE },
} = INSURANCE_ROUTES;

const {
  ALTERNATIVE_TRADING_ADDRESS: { FULL_ADDRESS },
} = BUSINESS_FIELD_IDS;

const {
  COMPANIES_HOUSE: { COMPANY_ADDRESS },
} = INSURANCE_FIELD_IDS;

describe('controllers/insurance/business/alternative-trading-address', () => {
  let req: Request;
  let res: ResponseInsurance;

  beforeEach(() => {
    req = mockReq();
    res = mockResInsurance();
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
            ID: FULL_ADDRESS,
            ...EXPORTER_BUSINESS_FIELDS[FULL_ADDRESS],
          },
          REGISTERED_OFFICE_ADDRESS: {
            ID: COMPANY_ADDRESS,
            HEADING: EXPORTER_BUSINESS_FIELDS[FULL_ADDRESS].REGISTERED_OFFICE_ADDRESS_HEADING,
            HINT: EXPORTER_BUSINESS_FIELDS[FULL_ADDRESS].REGISTERED_OFFICE_ADDRESS_HINT,
          },
        },
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
        application: mapApplicationToFormFields(mockApplication),
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${SAVE_AND_BACK}`,
      });
    });
  });

  describe('post', () => {
    mapAndSave.companyDifferentTradingAddress = jest.fn(() => Promise.resolve(true));

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
          SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${SAVE_AND_BACK}`,
        });
      });
    });

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = {
          [FULL_ADDRESS]: 'mock address',
        };
      });

      it('should call mapAndSave.business once with the data from constructPayload function and application', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, [FULL_ADDRESS]);

        expect(mapAndSave.companyDifferentTradingAddress).toHaveBeenCalledTimes(1);

        expect(mapAndSave.companyDifferentTradingAddress).toHaveBeenCalledWith(payload, mockApplication);
      });

      it('should redirect to next page', async () => {
        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${referenceNumber}${NATURE_OF_BUSINESS_ROOT}`;
        expect(res.redirect).toHaveBeenCalledWith(expected);
      });

      describe("when the url's last substring is `change`", () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
          req.originalUrl = ALTERNATIVE_TRADING_ADDRESS_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe("when the url's last substring is `check-and-change`", () => {
        it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
          req.originalUrl = ALTERNATIVE_TRADING_ADDRESS_CHECK_AND_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });
    });
  });
});
