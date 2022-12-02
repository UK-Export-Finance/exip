import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockCompanyResponse } from '../../../../test-mocks';
import { get, postCompaniesHouseSearch } from '.';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import corePageVariables from '../../../../helpers/page-variables/core/insurance';
import { PAGES, ERROR_MESSAGES } from '../../../../content-strings';
import generateValidationErrors from '../../../../helpers/validation';
import api from '../../../../api';
import { companyHouseSummaryList } from '../../../../helpers/summary-lists/company-house-summary-list';

const { COMPANY_HOUSE } = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

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

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS, {
        ...corePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS,
          BACK_LINK: req.headers.referer,
        }),
        POST_ROUTE: ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE_SEARCH,
        FIELDS: COMPANY_HOUSE,
      });
    });
  });

  describe('postCompaniesHouseSearch', () => {
    describe('when there are validation errors', () => {
      it('should render template with validation errors when companies house input is empty', () => {
        req.body = {
          companiesHouseNumber: '',
        };

        postCompaniesHouseSearch(req, res);

        const errorMessage = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS[FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE.INPUT].INCORRECT_FORMAT;
        expect(res.render).toHaveBeenCalledWith(TEMPLATES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS, {
          ...corePageVariables({
            PAGE_CONTENT_STRINGS: PAGES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS,
            BACK_LINK: req.headers.referer,
          }),
          POST_ROUTE: ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE_SEARCH,
          FIELDS: COMPANY_HOUSE,
          validationErrors: generateValidationErrors(FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE.INPUT, errorMessage, {}),
          companiesHouseNumber: req.body.companiesHouseNumber,
        });
      });

      it('should render template with validation errors when companies house input is less than 6 numbers', () => {
        req.body = {
          companiesHouseNumber: '1234',
        };

        postCompaniesHouseSearch(req, res);

        const errorMessage = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS[FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE.INPUT].INCORRECT_FORMAT;
        expect(res.render).toHaveBeenCalledWith(TEMPLATES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS, {
          ...corePageVariables({
            PAGE_CONTENT_STRINGS: PAGES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS,
            BACK_LINK: req.headers.referer,
          }),
          POST_ROUTE: ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE_SEARCH,
          FIELDS: COMPANY_HOUSE,
          validationErrors: generateValidationErrors(FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE.INPUT, errorMessage, {}),
          companiesHouseNumber: req.body.companiesHouseNumber,
        });
      });

      it('should render template with validation errors when companies house input has special characters', () => {
        req.body = {
          companiesHouseNumber: '123456!',
        };

        postCompaniesHouseSearch(req, res);

        const errorMessage = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS[FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE.INPUT].INCORRECT_FORMAT;
        expect(res.render).toHaveBeenCalledWith(TEMPLATES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS, {
          ...corePageVariables({
            PAGE_CONTENT_STRINGS: PAGES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS,
            BACK_LINK: req.headers.referer,
          }),
          POST_ROUTE: ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE_SEARCH,
          FIELDS: COMPANY_HOUSE,
          validationErrors: generateValidationErrors(FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE.INPUT, errorMessage, {}),
          companiesHouseNumber: req.body.companiesHouseNumber,
        });
      });

      it('should render template with validation errors if company not found', async () => {
        req.body = {
          companiesHouseNumber: '123456',
        };

        const getCompaniesHouseResponse = jest.fn(() => Promise.resolve({ success: false }));
        api.keystone.getCompaniesHouseInformation = getCompaniesHouseResponse;

        await postCompaniesHouseSearch(req, res);

        const errorMessage = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS[FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE.INPUT].NOT_FOUND;
        expect(res.render).toHaveBeenCalledWith(TEMPLATES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS, {
          ...corePageVariables({
            PAGE_CONTENT_STRINGS: PAGES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS,
            BACK_LINK: req.headers.referer,
          }),
          POST_ROUTE: ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE_SEARCH,
          FIELDS: COMPANY_HOUSE,
          validationErrors: generateValidationErrors(FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE.INPUT, errorMessage, {}),
          companiesHouseNumber: req.body.companiesHouseNumber,
        });
      });

      it('should render template with validation errors if error with companies house api', async () => {
        req.body = {
          companiesHouseNumber: '123456',
        };

        const getCompaniesHouseResponse = jest.fn(() => Promise.resolve({ apiError: true }));
        api.keystone.getCompaniesHouseInformation = getCompaniesHouseResponse;

        await postCompaniesHouseSearch(req, res);

        const errorMessage = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS[FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE.INPUT].TECHNICAL_ISSUES;
        expect(res.render).toHaveBeenCalledWith(TEMPLATES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS, {
          ...corePageVariables({
            PAGE_CONTENT_STRINGS: PAGES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS,
            BACK_LINK: req.headers.referer,
          }),
          POST_ROUTE: ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE_SEARCH,
          FIELDS: COMPANY_HOUSE,
          validationErrors: generateValidationErrors(FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE.INPUT, errorMessage, {}),
          companiesHouseNumber: req.body.companiesHouseNumber,
        });
      });
    });

    describe('should render template with summary list populated when company found by companies house api', () => {
      it('should render template with summary list populated if receive response from api', async () => {
        req.body = {
          companiesHouseNumber: '123456',
        };

        const getCompaniesHouseResponse = jest.fn(() => Promise.resolve(mockCompanyResponse));
        api.keystone.getCompaniesHouseInformation = getCompaniesHouseResponse;

        await postCompaniesHouseSearch(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS, {
          ...corePageVariables({
            PAGE_CONTENT_STRINGS: PAGES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS,
            BACK_LINK: req.headers.referer,
          }),
          POST_ROUTE: ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE_SEARCH,
          FIELDS: COMPANY_HOUSE,
          SUMMARY_LIST: companyHouseSummaryList(mockCompanyResponse),
          companiesHouseNumber: req.body.companiesHouseNumber,
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
});
