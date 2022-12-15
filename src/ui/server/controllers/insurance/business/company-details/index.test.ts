import { Request, Response } from '../../../../../types';
import { pageVariables, get, postCompaniesHouseSearch, post } from '.';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import corePageVariables from '../../../../helpers/page-variables/core/insurance';
import { PAGES, ERROR_MESSAGES } from '../../../../content-strings';
import generateValidationErrors from '../../../../helpers/validation';
import api from '../../../../api';
import { companyHouseSummaryList } from '../../../../helpers/summary-lists/company-house-summary-list';
import { mockReq, mockRes, mockCompany, mockApplication } from '../../../../test-mocks';
import { sanitiseValue } from '../../../../helpers/sanitise-data';

const { EXPORTER_BUSINESS } = FIELD_IDS.INSURANCE;
const {
  EXPORTER_BUSINESS: {
    COMPANY_HOUSE,
    YOUR_COMPANY: { TRADING_NAME },
  },
} = FIELD_IDS.INSURANCE;

const { COMPANY_DETAILS } = PAGES.INSURANCE.EXPORTER_BUSINESS;
const { COMPANY_DETAILS: companyDetailsTemplate } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

const { INSURANCE_ROOT, EXPORTER_BUSINESS: EXPORTER_BUSINESS_ROUTES } = ROUTES.INSURANCE;

const { COMPANY_HOUSE_SEARCH, COMPANY_DETAILS: COMPANY_DETAILS_ROUTE } = EXPORTER_BUSINESS_ROUTES;

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

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(mockApplication.referenceNumber);

      const expected = {
        POST_ROUTES: {
          COMPANIES_HOUSE: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${COMPANY_HOUSE_SEARCH}`,
          COMPANY_DETAILS: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${COMPANY_DETAILS_ROUTE}`,
        },
        FIELDS: EXPORTER_BUSINESS,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render the company-details template with correct variables', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(companyDetailsTemplate, {
        ...corePageVariables({
          PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(mockApplication.referenceNumber),
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

  describe('postCompaniesHouseSearch', () => {
    describe('when there are validation errors', () => {
      it('should render template with validation errors when companies house input is empty', async () => {
        req.body = {
          companiesHouseNumber: '',
        };

        const submittedValues = {
          [COMPANY_HOUSE.INPUT]: req.body[COMPANY_HOUSE.INPUT],
        };

        await postCompaniesHouseSearch(req, res);

        const errorMessage = EXPORTER_BUSINESS_ERROR[COMPANY_HOUSE.INPUT].INCORRECT_FORMAT;
        expect(res.render).toHaveBeenCalledWith(companyDetailsTemplate, {
          ...corePageVariables({
            PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(mockApplication.referenceNumber),
          validationErrors: generateValidationErrors(COMPANY_HOUSE.INPUT, errorMessage, {}),
          submittedValues,
        });
      });

      it('should render template with validation errors when companies house input is less than 6 numbers', async () => {
        req.body = {
          companiesHouseNumber: '1234',
        };

        const submittedValues = {
          [COMPANY_HOUSE.INPUT]: req.body[COMPANY_HOUSE.INPUT],
        };

        await postCompaniesHouseSearch(req, res);

        const errorMessage = EXPORTER_BUSINESS_ERROR[COMPANY_HOUSE.INPUT].INCORRECT_FORMAT;
        expect(res.render).toHaveBeenCalledWith(companyDetailsTemplate, {
          ...corePageVariables({
            PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(mockApplication.referenceNumber),
          validationErrors: generateValidationErrors(COMPANY_HOUSE.INPUT, errorMessage, {}),
          submittedValues,
        });
      });

      it('should render template with validation errors when companies house input has special characters', async () => {
        req.body = {
          companiesHouseNumber: '123456!',
        };

        const submittedValues = {
          [COMPANY_HOUSE.INPUT]: req.body[COMPANY_HOUSE.INPUT],
        };

        await postCompaniesHouseSearch(req, res);

        const errorMessage = EXPORTER_BUSINESS_ERROR[COMPANY_HOUSE.INPUT].INCORRECT_FORMAT;
        expect(res.render).toHaveBeenCalledWith(companyDetailsTemplate, {
          ...corePageVariables({
            PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(mockApplication.referenceNumber),
          validationErrors: generateValidationErrors(COMPANY_HOUSE.INPUT, errorMessage, {}),
          submittedValues,
        });
      });

      it('should render template with validation errors if company not found', async () => {
        req.body = {
          companiesHouseNumber: '123456',
        };

        const submittedValues = {
          [COMPANY_HOUSE.INPUT]: req.body[COMPANY_HOUSE.INPUT],
        };

        const getCompaniesHouseResponse = jest.fn(() => Promise.resolve({ success: false }));
        api.keystone.getCompaniesHouseInformation = getCompaniesHouseResponse;

        await postCompaniesHouseSearch(req, res);

        const errorMessage = EXPORTER_BUSINESS_ERROR[COMPANY_HOUSE.INPUT].NOT_FOUND;
        expect(res.render).toHaveBeenCalledWith(companyDetailsTemplate, {
          ...corePageVariables({
            PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(mockApplication.referenceNumber),
          validationErrors: generateValidationErrors(COMPANY_HOUSE.INPUT, errorMessage, {}),
          submittedValues,
        });
      });

      it('should render template with validation errors if error with companies house api', async () => {
        req.body = {
          companiesHouseNumber: '123456',
        };

        const submittedValues = {
          [COMPANY_HOUSE.INPUT]: req.body[COMPANY_HOUSE.INPUT],
        };

        const getCompaniesHouseResponse = jest.fn(() => Promise.resolve({ apiError: true }));
        api.keystone.getCompaniesHouseInformation = getCompaniesHouseResponse;

        await postCompaniesHouseSearch(req, res);

        const errorMessage = EXPORTER_BUSINESS_ERROR[COMPANY_HOUSE.INPUT].TECHNICAL_ISSUES;
        expect(res.render).toHaveBeenCalledWith(companyDetailsTemplate, {
          ...corePageVariables({
            PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(mockApplication.referenceNumber),
          validationErrors: generateValidationErrors(COMPANY_HOUSE.INPUT, errorMessage, {}),
          submittedValues,
        });
      });
    });

    describe('should render template with summary list populated when company found by companies house api', () => {
      it('should render template with summary list populated if receive response from api', async () => {
        req.body = {
          companiesHouseNumber: '123456',
        };

        const submittedValues = {
          [COMPANY_HOUSE.INPUT]: req.body[COMPANY_HOUSE.INPUT],
        };

        const getCompaniesHouseResponse = jest.fn(() => Promise.resolve(mockCompany));
        api.keystone.getCompaniesHouseInformation = getCompaniesHouseResponse;

        await postCompaniesHouseSearch(req, res);

        expect(res.render).toHaveBeenCalledWith(companyDetailsTemplate, {
          ...corePageVariables({
            PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(mockApplication.referenceNumber),
          SUMMARY_LIST: companyHouseSummaryList(mockCompany),
          submittedValues,
          validationErrors: {},
        });
      });
    });

    describe('when there are errors caught on the post request', () => {
      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
        req.body = {
          companiesHouseNumber: '123456',
        };

        const getCompaniesHouseResponse = jest.fn(() => Promise.reject());
        api.keystone.getCompaniesHouseInformation = getCompaniesHouseResponse;

        await postCompaniesHouseSearch(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        res.locals = { csrfToken: '1234' };
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, () => {
        postCompaniesHouseSearch(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });
  });

  describe('post', () => {
    it('should display validation errors when there is no trading name or companies house number', async () => {
      req.body = {};

      const submittedValues = {
        [COMPANY_HOUSE.INPUT]: req.body[COMPANY_HOUSE.INPUT],
        [TRADING_NAME]: sanitiseValue(req.body[TRADING_NAME]),
      };

      await post(req, res);

      const errorMessageTradingName = EXPORTER_BUSINESS_ERROR[TRADING_NAME].IS_EMPTY;
      const errorMessageCompanyHouseIncorrect = EXPORTER_BUSINESS_ERROR[COMPANY_HOUSE.INPUT].INCORRECT_FORMAT;

      let validationErrors = generateValidationErrors(COMPANY_HOUSE.INPUT, errorMessageCompanyHouseIncorrect, {});
      validationErrors = generateValidationErrors(TRADING_NAME, errorMessageTradingName, validationErrors);

      expect(res.render).toHaveBeenCalledWith(companyDetailsTemplate, {
        ...corePageVariables({
          PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(mockApplication.referenceNumber),
        validationErrors,
        submittedValues,
      });
    });

    it('should display validation errors when there is no trading name and api error for companies house', async () => {
      req.body = {
        companiesHouseNumber: '123456',
      };

      const submittedValues = {
        [COMPANY_HOUSE.INPUT]: req.body[COMPANY_HOUSE.INPUT],
        [TRADING_NAME]: sanitiseValue(req.body[TRADING_NAME]),
      };

      const getCompaniesHouseResponse = jest.fn(() => Promise.resolve({ apiError: true }));
      api.keystone.getCompaniesHouseInformation = getCompaniesHouseResponse;

      await post(req, res);

      const errorMessageTradingName = EXPORTER_BUSINESS_ERROR[TRADING_NAME].IS_EMPTY;
      const errorMessageCompanyHouseIssue = EXPORTER_BUSINESS_ERROR[COMPANY_HOUSE.INPUT].TECHNICAL_ISSUES;

      let validationErrors = generateValidationErrors(COMPANY_HOUSE.INPUT, errorMessageCompanyHouseIssue, {});
      validationErrors = generateValidationErrors(TRADING_NAME, errorMessageTradingName, validationErrors);

      expect(res.render).toHaveBeenCalledWith(companyDetailsTemplate, {
        ...corePageVariables({
          PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(mockApplication.referenceNumber),
        validationErrors,
        submittedValues,
      });
    });

    it('should display validation errors when there is no trading name and company not found', async () => {
      req.body = {
        companiesHouseNumber: '123456',
      };

      const submittedValues = {
        [COMPANY_HOUSE.INPUT]: req.body[COMPANY_HOUSE.INPUT],
        [TRADING_NAME]: sanitiseValue(req.body[TRADING_NAME]),
      };

      const getCompaniesHouseResponse = jest.fn(() => Promise.resolve({ success: false }));
      api.keystone.getCompaniesHouseInformation = getCompaniesHouseResponse;

      await post(req, res);

      const errorMessageTradingName = EXPORTER_BUSINESS_ERROR[TRADING_NAME].IS_EMPTY;
      const errorMessageCompanyHouseIssue = EXPORTER_BUSINESS_ERROR[COMPANY_HOUSE.INPUT].NOT_FOUND;

      let validationErrors = generateValidationErrors(COMPANY_HOUSE.INPUT, errorMessageCompanyHouseIssue, {});
      validationErrors = generateValidationErrors(TRADING_NAME, errorMessageTradingName, validationErrors);

      expect(res.render).toHaveBeenCalledWith(companyDetailsTemplate, {
        ...corePageVariables({
          PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(mockApplication.referenceNumber),
        validationErrors,
        submittedValues,
      });
    });

    it('should display validation error for trading anme when there is no trading name and company is found', async () => {
      req.body = {
        companiesHouseNumber: '123456',
      };

      const submittedValues = {
        [COMPANY_HOUSE.INPUT]: req.body[COMPANY_HOUSE.INPUT],
        [TRADING_NAME]: sanitiseValue(req.body[TRADING_NAME]),
      };

      const getCompaniesHouseResponse = jest.fn(() => Promise.resolve(mockCompany));
      api.keystone.getCompaniesHouseInformation = getCompaniesHouseResponse;

      await post(req, res);

      const errorMessageTradingName = EXPORTER_BUSINESS_ERROR[TRADING_NAME].IS_EMPTY;

      expect(res.render).toHaveBeenCalledWith(companyDetailsTemplate, {
        ...corePageVariables({
          PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(mockApplication.referenceNumber),
        validationErrors: generateValidationErrors(TRADING_NAME, errorMessageTradingName, {}),
        submittedValues,
      });
    });

    it('should display validation error for companies house when company house error but trading name radio is selected', async () => {
      req.body = {
        companiesHouseNumber: '123456',
        [TRADING_NAME]: 'true',
      };

      const submittedValues = {
        [COMPANY_HOUSE.INPUT]: req.body[COMPANY_HOUSE.INPUT],
        [TRADING_NAME]: sanitiseValue(req.body[TRADING_NAME]),
      };

      const getCompaniesHouseResponse = jest.fn(() => Promise.resolve({ apiError: true }));
      api.keystone.getCompaniesHouseInformation = getCompaniesHouseResponse;

      await post(req, res);

      const errorMessage = EXPORTER_BUSINESS_ERROR[COMPANY_HOUSE.INPUT].TECHNICAL_ISSUES;

      expect(res.render).toHaveBeenCalledWith(companyDetailsTemplate, {
        ...corePageVariables({
          PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(mockApplication.referenceNumber),
        validationErrors: generateValidationErrors(COMPANY_HOUSE.INPUT, errorMessage, {}),
        submittedValues,
      });
    });

    describe('when there is no application', () => {
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
