import { pageVariables, get, post, TEMPLATE, FIELD_IDS } from '.';
import { ROUTES, TEMPLATES } from '../../../../constants';
import BUSINESS_FIELD_IDS from '../../../../constants/field-ids/insurance/business';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { PAGES } from '../../../../content-strings';
import constructPayload from '../../../../helpers/construct-payload';
import { sanitiseValue } from '../../../../helpers/sanitise-data';
import mapAndSave from '../map-and-save/company-details';
import { populateCompaniesHouseSummaryList } from './helpers/populate-companies-house-summary-list';
import { Request, Response } from '../../../../../types';
import companyDetailsValidation from './validation/company-details';
import { mockReq, mockRes, mockApplication, mockPhoneNumbers } from '../../../../test-mocks';

const {
  YOUR_COMPANY: { TRADING_NAME, TRADING_ADDRESS, WEBSITE, PHONE_NUMBER },
} = BUSINESS_FIELD_IDS;

const { COMPANY_DETAILS } = PAGES.INSURANCE.EXPORTER_BUSINESS;
const { COMPANY_DETAILS: companyDetailsTemplate } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

const { VALID_PHONE_NUMBERS } = mockPhoneNumbers;

const {
  INSURANCE_ROOT,
  EXPORTER_BUSINESS: {
    COMPANY_DETAILS_SAVE_AND_BACK,
    COMPANIES_HOUSE_NUMBER_ROOT,
    CONTACT_ROOT,
    CHECK_YOUR_ANSWERS,
    COMPANY_DETAILS_CHANGE,
    COMPANY_DETAILS_ROOT,
    COMPANY_DETAILS_CHECK_AND_CHANGE,
  },
  CHECK_YOUR_ANSWERS: { YOUR_BUSINESS: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = ROUTES.INSURANCE;

describe('controllers/insurance/business/companies-details', () => {
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
      expect(TEMPLATE).toEqual(companyDetailsTemplate);
    });
  });

  describe('FIELD_IDS', () => {
    it('should have the correct FIELD_IDS', () => {
      const expected = [TRADING_NAME, TRADING_ADDRESS, WEBSITE, PHONE_NUMBER];

      expect(FIELD_IDS).toEqual(expected);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(mockApplication.referenceNumber);

      const expected = {
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${COMPANY_DETAILS_SAVE_AND_BACK}`,
        DIFFERENT_COMPANIES_HOUSE_NUMBER: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${COMPANIES_HOUSE_NUMBER_ROOT}`,
        FIELDS: BUSINESS_FIELD_IDS,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('get', () => {
    describe('when application has populated company data', () => {
      it('should render the company-details template with correct variables', () => {
        get(req, res);
        const { company, referenceNumber } = mockApplication;

        const submittedValues = {
          [TRADING_NAME]: company?.[TRADING_NAME],
          [TRADING_ADDRESS]: company?.[TRADING_ADDRESS],
          [WEBSITE]: company?.[WEBSITE],
          [PHONE_NUMBER]: company?.[PHONE_NUMBER],
        };

        expect(res.render).toHaveBeenCalledWith(companyDetailsTemplate, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
            BACK_LINK: req.headers.referer,
          }),
          userName: getUserNameFromSession(req.session.user),
          ...pageVariables(referenceNumber),
          submittedValues,
          SUMMARY_LIST: populateCompaniesHouseSummaryList(company),
        });
      });
    });

    describe('when there is no company number', () => {
      beforeEach(() => {
        // @ts-ignore
        res.locals.application.company.companyNumber = '';
      });

      it(`should redirect to ${COMPANIES_HOUSE_NUMBER_ROOT}`, () => {
        get(req, res);

        const expectedUrl = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${COMPANIES_HOUSE_NUMBER_ROOT}`;

        expect(res.redirect).toHaveBeenCalledWith(expectedUrl);
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
    mapAndSave.companyDetails = jest.fn(() => Promise.resolve(true));

    const validBody = {
      [TRADING_NAME]: 'true',
      [TRADING_ADDRESS]: 'false',
      [PHONE_NUMBER]: VALID_PHONE_NUMBERS.LANDLINE,
    };

    describe('when there are validation errors', () => {
      it('should render template with validation errors and submitted values', async () => {
        req.body = {};

        const payload = constructPayload(req.body, FIELD_IDS);

        const expectedSubmittedValues = {
          [TRADING_NAME]: sanitiseValue({ key: TRADING_NAME, value: payload[TRADING_NAME] }),
          [TRADING_ADDRESS]: sanitiseValue({ key: TRADING_ADDRESS, value: payload[TRADING_ADDRESS] }),
          [WEBSITE]: payload[WEBSITE],
          [PHONE_NUMBER]: payload[PHONE_NUMBER],
        };

        await post(req, res);

        const validationErrors = companyDetailsValidation(payload);

        expect(res.render).toHaveBeenCalledWith(companyDetailsTemplate, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
            BACK_LINK: req.headers.referer,
          }),
          userName: getUserNameFromSession(req.session.user),
          ...pageVariables(mockApplication.referenceNumber),
          validationErrors,
          submittedValues: expectedSubmittedValues,
          SUMMARY_LIST: populateCompaniesHouseSummaryList(mockApplication.company),
        });
      });
    });

    describe('when there are no validation errors', () => {
      it('should redirect to next page', async () => {
        req.body = validBody;
        req.originalUrl = `insurance/${mockApplication.referenceNumber}/${COMPANY_DETAILS_ROOT}`;

        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${CONTACT_ROOT}`;
        expect(res.redirect).toHaveBeenCalledWith(expected);
      });

      it('should call mapAndSave.companyDetails once with data from constructPayload function and application', async () => {
        req.body = {
          ...validBody,
          injection: 1,
        };

        await post(req, res);

        expect(mapAndSave.companyDetails).toHaveBeenCalledTimes(1);

        const payload = constructPayload(req.body, FIELD_IDS);

        expect(mapAndSave.companyDetails).toHaveBeenCalledWith(payload, mockApplication);
      });

      describe("when the url's last substring is `change`", () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
          req.body = validBody;

          req.originalUrl = COMPANY_DETAILS_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${CHECK_YOUR_ANSWERS}`;
          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe("when the url's last substring is `check-and-change`", () => {
        it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
          req.body = validBody;
          req.originalUrl = COMPANY_DETAILS_CHECK_AND_CHANGE;

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

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('api error handling', () => {
      describe('when mapAndSave.companyDetails returns an error', () => {
        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          req.body = validBody;

          mapAndSave.companyDetails = jest.fn(() => Promise.reject(new Error('mock')));

          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });

      describe('when mapAndSave.companyDetails resolves false', () => {
        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          req.body = validBody;
          res.locals = mockRes().locals;
          mapAndSave.companyDetails = jest.fn(() => Promise.resolve(false));

          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });
    });
  });
});
