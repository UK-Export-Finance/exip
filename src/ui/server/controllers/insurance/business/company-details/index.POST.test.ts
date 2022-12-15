import { Request, Response } from '../../../../../types';
import { pageVariables, post } from '.';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import corePageVariables from '../../../../helpers/page-variables/core/insurance';
import { PAGES, ERROR_MESSAGES } from '../../../../content-strings';
import generateValidationErrors from '../../../../helpers/validation';
import api from '../../../../api';
import { mockReq, mockRes, mockCompany, mockApplication } from '../../../../test-mocks';
import { sanitiseValue } from '../../../../helpers/sanitise-data';

const {
  EXPORTER_BUSINESS: {
    COMPANY_HOUSE,
    YOUR_COMPANY: { TRADING_NAME },
  },
} = FIELD_IDS.INSURANCE;

const { COMPANY_DETAILS } = PAGES.INSURANCE.EXPORTER_BUSINESS;
const { COMPANY_DETAILS: companyDetailsTemplate } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

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

    it('should display validation error for trading name when there is no trading name and company is found', async () => {
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
