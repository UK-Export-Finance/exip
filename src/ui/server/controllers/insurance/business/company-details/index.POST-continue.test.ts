import { Request, Response } from '../../../../../types';
import { pageVariables, post } from '.';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import corePageVariables from '../../../../helpers/page-variables/core/insurance';
import { PAGES } from '../../../../content-strings';
import companiesHouseValidation from './validation/companies-house';
import companyDetailsValidation from './validation/company-details';
import { mockReq, mockRes, mockApplication, mockPhoneNumbers, mockCompany } from '../../../../test-mocks';
import { sanitiseValue } from '../../../../helpers/sanitise-data';
import api from '../../../../api';

const {
  EXPORTER_BUSINESS: {
    COMPANY_HOUSE: { INPUT },
    YOUR_COMPANY: { TRADING_NAME, TRADING_ADDRESS, WEBSITE, PHONE_NUMBER },
  },
} = FIELD_IDS.INSURANCE;

const { COMPANY_DETAILS } = PAGES.INSURANCE.EXPORTER_BUSINESS;
const { COMPANY_DETAILS: companyDetailsTemplate } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

const { VALID_PHONE_NUMBERS } = mockPhoneNumbers;

const {
  EXPORTER_BUSINESS: { NATURE_OF_BUSINESS },
} = ROUTES.INSURANCE;

describe('controllers/insurance/business/companies-details', () => {
  let req: Request;
  let res: Response;

  const getCompaniesHouseResponse = jest.fn(() => Promise.resolve(mockCompany));
  api.keystone.getCompaniesHouseInformation = getCompaniesHouseResponse;

  const mockUpdateApplicationResponse = mockApplication;
  api.keystone.application.update.exporterCompany = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplication;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('post', () => {
    describe('when there are validation errors', () => {
      it('should render template with validation errors', async () => {
        req.body = {};

        const submittedValues = {
          [INPUT]: req.body[INPUT],
          [TRADING_NAME]: sanitiseValue(req.body[TRADING_NAME]),
          [TRADING_ADDRESS]: sanitiseValue(req.body[TRADING_ADDRESS]),
          [WEBSITE]: req.body[WEBSITE],
        };

        await post(req, res);

        let validationErrors = companiesHouseValidation(req.body);
        validationErrors = companyDetailsValidation(req.body, validationErrors);

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
    });

    describe('when there are no validation errors', () => {
      it('should redirect to next page', async () => {
        req.body = {
          [INPUT]: '8989898',
          [TRADING_NAME]: 'true',
          [TRADING_ADDRESS]: 'false',
          [PHONE_NUMBER]: VALID_PHONE_NUMBERS.LANDLINE,
        };

        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(NATURE_OF_BUSINESS);
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

    describe('when api.keystone.application.update.exporterCompany does not return success', () => {
      beforeEach(() => {
        res.locals = { csrfToken: '1234' };
        api.keystone.application.update.exporterCompany = jest.fn(() => Promise.reject());
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });
  });
});
