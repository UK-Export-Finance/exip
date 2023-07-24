import { pageVariables, get, redirectToExitPage, postCompaniesHouseSearch, TEMPLATE, FIELD_IDS } from '.';
import { ROUTES, TEMPLATES } from '../../../../constants';
import BUSINESS_FIELD_IDS from '../../../../constants/field-ids/insurance/business';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { PAGES, ERROR_MESSAGES } from '../../../../content-strings';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from '../../../../helpers/validation';
import api from '../../../../api';
import { companyHouseSummaryList } from '../../../../helpers/summary-lists/company-house-summary-list';
import { populateCompaniesHouseSummaryList } from './helpers/populate-companies-house-summary-list';
import { mockReq, mockRes, mockCompany, mockApplication } from '../../../../test-mocks';
import { Request, Response, Application } from '../../../../../types';

const {
  COMPANY_HOUSE,
  YOUR_COMPANY: { TRADING_NAME, TRADING_ADDRESS, WEBSITE, PHONE_NUMBER },
} = BUSINESS_FIELD_IDS;

const { COMPANY_DETAILS } = PAGES.INSURANCE.EXPORTER_BUSINESS;
const { COMPANY_DETAILS: companyDetailsTemplate } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

const { INSURANCE_ROOT, EXPORTER_BUSINESS: EXPORTER_BUSINESS_ROUTES, PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

const {
  COMPANY_HOUSE_SEARCH,
  COMPANY_DETAILS: COMPANY_DETAILS_ROUTE,
  COMPANIES_HOUSE_UNAVAILABLE,
  NO_COMPANIES_HOUSE_NUMBER,
  COMPANY_DETAILS_SAVE_AND_BACK,
  COMPANY_DETAILS_CHANGE,
  COMPANY_DETAILS_CHECK_AND_CHANGE,
} = EXPORTER_BUSINESS_ROUTES;

const { EXPORTER_BUSINESS: EXPORTER_BUSINESS_ERROR } = ERROR_MESSAGES.INSURANCE;

describe('controllers/insurance/business/companies-details', () => {
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
      expect(TEMPLATE).toEqual(companyDetailsTemplate);
    });
  });

  describe('FIELD_IDS', () => {
    it('should have the correct FIELD_IDS', () => {
      const expected = [COMPANY_HOUSE.INPUT, TRADING_NAME, TRADING_ADDRESS, WEBSITE, PHONE_NUMBER];

      expect(FIELD_IDS).toEqual(expected);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const ORIGINAL_URL = COMPANY_DETAILS_ROUTE;

      const result = pageVariables(mockApplication.referenceNumber, ORIGINAL_URL);

      const expected = {
        POST_ROUTES: {
          COMPANIES_HOUSE: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${COMPANY_HOUSE_SEARCH}`,
          COMPANY_DETAILS: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${COMPANY_DETAILS_ROUTE}`,
          NO_COMPANIES_HOUSE_NUMBER: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${NO_COMPANIES_HOUSE_NUMBER}`,
          SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${COMPANY_DETAILS_SAVE_AND_BACK}`,
        },
        FIELDS: BUSINESS_FIELD_IDS,
      };

      expect(result).toEqual(expected);
    });

    describe("when the url's last substring is `change`", () => {
      it('should have correct properties', () => {
        const ORIGINAL_URL = COMPANY_DETAILS_CHANGE;

        const result = pageVariables(mockApplication.referenceNumber, ORIGINAL_URL);

        const expected = {
          POST_ROUTES: {
            COMPANIES_HOUSE: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${COMPANY_HOUSE_SEARCH}`,
            COMPANY_DETAILS: ORIGINAL_URL,
            NO_COMPANIES_HOUSE_NUMBER: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${NO_COMPANIES_HOUSE_NUMBER}`,
            SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${COMPANY_DETAILS_SAVE_AND_BACK}`,
          },
          FIELDS: BUSINESS_FIELD_IDS,
        };

        expect(result).toEqual(expected);
      });
    });

    describe("when the url's last substring is `check-and-change`", () => {
      it('should have correct properties', () => {
        const ORIGINAL_URL = COMPANY_DETAILS_CHECK_AND_CHANGE;

        const result = pageVariables(mockApplication.referenceNumber, ORIGINAL_URL);

        const expected = {
          POST_ROUTES: {
            COMPANIES_HOUSE: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${COMPANY_HOUSE_SEARCH}`,
            COMPANY_DETAILS: ORIGINAL_URL,
            NO_COMPANIES_HOUSE_NUMBER: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${NO_COMPANIES_HOUSE_NUMBER}`,
            SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${COMPANY_DETAILS_SAVE_AND_BACK}`,
          },
          FIELDS: BUSINESS_FIELD_IDS,
        };

        expect(result).toEqual(expected);
      });
    });
  });

  describe('get', () => {
    describe('when application has populated company data', () => {
      it('should render the company-details template with correct variables', () => {
        get(req, res);
        const { company, referenceNumber } = mockApplication;

        const submittedValues = {
          [COMPANY_HOUSE.INPUT]: company?.[COMPANY_HOUSE.COMPANY_NUMBER],
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
          ...pageVariables(referenceNumber, COMPANY_DETAILS_ROUTE),
          submittedValues,
          SUMMARY_LIST: populateCompaniesHouseSummaryList(company),
        });
      });
    });

    describe('when application does not have populated company data', () => {
      it('should render the company-details template with correct variables', () => {
        const mockApplicationNoData = {
          ...mockApplication,
          company: {
            id: '13456',
            registeredOfficeAddress: {
              id: '2345',
            },
            sicCodes: [],
          },
        } as Application;

        res.locals.application = mockApplicationNoData;

        get(req, res);

        const { company, referenceNumber } = mockApplicationNoData;

        const submittedValues = {
          [COMPANY_HOUSE.INPUT]: company?.[COMPANY_HOUSE.COMPANY_NUMBER],
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
          ...pageVariables(referenceNumber, COMPANY_DETAILS_ROUTE),
          submittedValues,
          SUMMARY_LIST: null,
        });
      });
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        res.locals = { csrfToken: '1234' };
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, () => {
        get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });

  describe('redirectToExitPage', () => {
    describe('noCompaniesHouseNumber', () => {
      it('should redirect to the APPLY_OFFLINE page with NO_COMPANIES_HOUSE_NUMBER message', () => {
        redirectToExitPage.noCompaniesHouseNumber(req, res);

        const expectedReason = PAGES.INSURANCE.APPLY_OFFLINE.REASON.NO_COMPANIES_HOUSE_NUMBER;
        expect(req.flash).toHaveBeenCalledWith('exitReason', expectedReason);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.INSURANCE.APPLY_OFFLINE);
      });
    });
  });

  describe('postCompaniesHouseSearch', () => {
    describe('when there are validation errors', () => {
      it('should render template with validation errors when companies house input is empty', async () => {
        req.body = {
          companiesHouseNumber: '',
        };

        const payload = constructPayload(req.body, FIELD_IDS);

        await postCompaniesHouseSearch(req, res);

        const errorMessage = EXPORTER_BUSINESS_ERROR[COMPANY_HOUSE.INPUT].INCORRECT_FORMAT;
        expect(res.render).toHaveBeenCalledWith(companyDetailsTemplate, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
            BACK_LINK: req.headers.referer,
          }),
          userName: getUserNameFromSession(req.session.user),
          ...pageVariables(mockApplication.referenceNumber, COMPANY_DETAILS_ROUTE),
          validationErrors: generateValidationErrors(COMPANY_HOUSE.INPUT, errorMessage, {}),
          submittedValues: payload,
        });
      });

      it('should render template with validation errors when companies house input is less than 6 numbers', async () => {
        req.body = {
          companiesHouseNumber: '1234',
        };

        const payload = constructPayload(req.body, FIELD_IDS);

        await postCompaniesHouseSearch(req, res);

        const errorMessage = EXPORTER_BUSINESS_ERROR[COMPANY_HOUSE.INPUT].INCORRECT_FORMAT;
        expect(res.render).toHaveBeenCalledWith(companyDetailsTemplate, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
            BACK_LINK: req.headers.referer,
          }),
          userName: getUserNameFromSession(req.session.user),
          ...pageVariables(mockApplication.referenceNumber, COMPANY_DETAILS_ROUTE),
          validationErrors: generateValidationErrors(COMPANY_HOUSE.INPUT, errorMessage, {}),
          submittedValues: payload,
        });
      });

      it('should render template with validation errors when companies house input has special characters', async () => {
        req.body = {
          companiesHouseNumber: '123456!',
        };

        const payload = constructPayload(req.body, FIELD_IDS);

        await postCompaniesHouseSearch(req, res);

        const errorMessage = EXPORTER_BUSINESS_ERROR[COMPANY_HOUSE.INPUT].INCORRECT_FORMAT;
        expect(res.render).toHaveBeenCalledWith(companyDetailsTemplate, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
            BACK_LINK: req.headers.referer,
          }),
          userName: getUserNameFromSession(req.session.user),
          ...pageVariables(mockApplication.referenceNumber, COMPANY_DETAILS_ROUTE),
          validationErrors: generateValidationErrors(COMPANY_HOUSE.INPUT, errorMessage, {}),
          submittedValues: payload,
        });
      });

      it('should render template with validation errors if company not found', async () => {
        req.body = {
          companiesHouseNumber: '123456',
        };

        const payload = constructPayload(req.body, FIELD_IDS);

        const getCompaniesHouseResponse = jest.fn(() => Promise.resolve({ success: false }));
        api.keystone.getCompaniesHouseInformation = getCompaniesHouseResponse;

        await postCompaniesHouseSearch(req, res);

        const errorMessage = EXPORTER_BUSINESS_ERROR[COMPANY_HOUSE.INPUT].NOT_FOUND;
        expect(res.render).toHaveBeenCalledWith(companyDetailsTemplate, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
            BACK_LINK: req.headers.referer,
          }),
          userName: getUserNameFromSession(req.session.user),
          ...pageVariables(mockApplication.referenceNumber, COMPANY_DETAILS_ROUTE),
          validationErrors: generateValidationErrors(COMPANY_HOUSE.INPUT, errorMessage, {}),
          submittedValues: payload,
        });
      });

      it('should redirect to companies house error page if error with companies house api or APIM industry sectors', async () => {
        req.body = {
          companiesHouseNumber: '123456',
        };

        const getCompaniesHouseResponse = jest.fn(() => Promise.resolve({ apiError: true }));
        api.keystone.getCompaniesHouseInformation = getCompaniesHouseResponse;

        await postCompaniesHouseSearch(req, res);

        expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${mockApplication.referenceNumber}${COMPANIES_HOUSE_UNAVAILABLE}`);
      });
    });

    describe('should render template with summary list populated when company found by companies house api', () => {
      let getCompaniesHouseResponse = jest.fn();

      beforeEach(() => {
        getCompaniesHouseResponse = jest.fn(() => Promise.resolve(mockCompany));
        api.keystone.getCompaniesHouseInformation = getCompaniesHouseResponse;
      });

      it('should render template with summary list populated if receive response from api', async () => {
        req.body = {
          companiesHouseNumber: '123456',
        };

        const payload = constructPayload(req.body, FIELD_IDS);

        await postCompaniesHouseSearch(req, res);

        expect(res.render).toHaveBeenCalledWith(companyDetailsTemplate, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
            BACK_LINK: req.headers.referer,
          }),
          userName: getUserNameFromSession(req.session.user),
          ...pageVariables(mockApplication.referenceNumber, COMPANY_DETAILS_ROUTE),
          SUMMARY_LIST: companyHouseSummaryList(mockCompany),
          submittedValues: payload,
          validationErrors: {},
        });
      });
    });

    describe('when there are errors caught on the companies house api', () => {
      it(`should redirect to ${COMPANIES_HOUSE_UNAVAILABLE}`, async () => {
        req.body = {
          companiesHouseNumber: '123456',
        };

        const getCompaniesHouseResponse = jest.fn(() => Promise.reject());
        api.keystone.getCompaniesHouseInformation = getCompaniesHouseResponse;

        await postCompaniesHouseSearch(req, res);

        expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${mockApplication.referenceNumber}${COMPANIES_HOUSE_UNAVAILABLE}`);
      });
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        res.locals = { csrfToken: '1234' };
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, () => {
        postCompaniesHouseSearch(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
