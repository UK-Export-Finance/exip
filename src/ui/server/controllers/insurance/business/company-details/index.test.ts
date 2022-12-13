import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockCompany } from '../../../../test-mocks';
import { get, postCompaniesHouseSearch, post } from '.';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import corePageVariables from '../../../../helpers/page-variables/core/insurance';
import { PAGES, ERROR_MESSAGES } from '../../../../content-strings';
import generateValidationErrors from '../../../../helpers/validation';
import api from '../../../../api';
import { companyHouseSummaryList } from '../../../../helpers/summary-lists/company-house-summary-list';
import { sanitiseData } from '../../../../helpers/sanitise-data';

const { EXPORTER_BUSINESS } = FIELD_IDS.INSURANCE;
const {
  EXPORTER_BUSINESS: {
    COMPANY_HOUSE,
    YOUR_COMPANY: { TRADING_NAME },
  },
} = FIELD_IDS.INSURANCE;

const { COMPANY_DETAILS } = PAGES.INSURANCE.EXPORTER_BUSINESS;
const { COMPANY_DETAILS: companyDetailsTemplate } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

const { COMPANY_HOUSE_SEARCH, COMPANY_DETAILS: COMPANY_DETAILS_ROUTE } = ROUTES.INSURANCE.EXPORTER_BUSINESS;

const { EXPORTER_BUSINESS: EXPORTER_BUSINESS_ERROR } = ERROR_MESSAGES.INSURANCE;

const PAGE_VARIABLES = {
  POST_ROUTES: {
    COMPANIES_HOUSE: COMPANY_HOUSE_SEARCH,
    COMPANY_DETAILS: COMPANY_DETAILS_ROUTE,
  },
  FIELDS: EXPORTER_BUSINESS,
};

describe('controllers/insurance/business/companies-details', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
    jest.resetAllMocks();
  });

  describe('get', () => {
    it('should render the company-details template with correct variables', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(companyDetailsTemplate, {
        ...corePageVariables({
          PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
          BACK_LINK: req.headers.referer,
        }),
        ...PAGE_VARIABLES,
      });
    });
  });

  describe('postCompaniesHouseSearch', () => {
    describe('when there are validation errors', () => {
      it('should render template with validation errors when companies house input is empty', () => {
        req.body = {
          companiesHouseNumber: '',
        };

        const submittedValues = {
          [COMPANY_HOUSE.INPUT]: req.body[COMPANY_HOUSE.INPUT],
        };

        postCompaniesHouseSearch(req, res);

        const errorMessage = EXPORTER_BUSINESS_ERROR[COMPANY_HOUSE.INPUT].INCORRECT_FORMAT;
        expect(res.render).toHaveBeenCalledWith(companyDetailsTemplate, {
          ...corePageVariables({
            PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
            BACK_LINK: req.headers.referer,
          }),
          ...PAGE_VARIABLES,
          validationErrors: generateValidationErrors(COMPANY_HOUSE.INPUT, errorMessage, {}),
          submittedValues,
        });
      });

      it('should render template with validation errors when companies house input is less than 6 numbers', () => {
        req.body = {
          companiesHouseNumber: '1234',
        };

        const submittedValues = {
          [COMPANY_HOUSE.INPUT]: req.body[COMPANY_HOUSE.INPUT],
        };

        postCompaniesHouseSearch(req, res);

        const errorMessage = EXPORTER_BUSINESS_ERROR[COMPANY_HOUSE.INPUT].INCORRECT_FORMAT;
        expect(res.render).toHaveBeenCalledWith(companyDetailsTemplate, {
          ...corePageVariables({
            PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
            BACK_LINK: req.headers.referer,
          }),
          ...PAGE_VARIABLES,
          validationErrors: generateValidationErrors(COMPANY_HOUSE.INPUT, errorMessage, {}),
          submittedValues,
        });
      });

      it('should render template with validation errors when companies house input has special characters', () => {
        req.body = {
          companiesHouseNumber: '123456!',
        };

        const submittedValues = {
          [COMPANY_HOUSE.INPUT]: req.body[COMPANY_HOUSE.INPUT],
        };

        postCompaniesHouseSearch(req, res);

        const errorMessage = EXPORTER_BUSINESS_ERROR[COMPANY_HOUSE.INPUT].INCORRECT_FORMAT;
        expect(res.render).toHaveBeenCalledWith(companyDetailsTemplate, {
          ...corePageVariables({
            PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
            BACK_LINK: req.headers.referer,
          }),
          ...PAGE_VARIABLES,
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
          ...PAGE_VARIABLES,
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
          ...PAGE_VARIABLES,
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
          ...PAGE_VARIABLES,
          SUMMARY_LIST: companyHouseSummaryList(mockCompany),
          submittedValues,
        });
      });
    });

    describe('when there are errors caught on the post request', () => {
      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
        req.body = {
          companiesHouseNumber: '123456',
        };

        const getCompaniesHouseResponse = jest.fn(() => Promise.resolve(null));
        api.keystone.getCompaniesHouseInformation = getCompaniesHouseResponse;

        await postCompaniesHouseSearch(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });
  });

  describe('post', () => {
    it('should display validation errors when there is no trading name', () => {
      req.body = {};

      const submittedValues = {
        [COMPANY_HOUSE.INPUT]: req.body[COMPANY_HOUSE.INPUT],
        [TRADING_NAME]: sanitiseData(req.body[TRADING_NAME]),
      };

      post(req, res);

      const errorMessage = EXPORTER_BUSINESS_ERROR[TRADING_NAME].IS_EMPTY;
      expect(res.render).toHaveBeenCalledWith(companyDetailsTemplate, {
        ...corePageVariables({
          PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
          BACK_LINK: req.headers.referer,
        }),
        ...PAGE_VARIABLES,
        validationErrors: generateValidationErrors(TRADING_NAME, errorMessage, {}),
        submittedValues,
      });
    });
  });
});
