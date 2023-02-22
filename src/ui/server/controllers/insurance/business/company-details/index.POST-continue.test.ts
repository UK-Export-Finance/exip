import { Request, Response } from '../../../../../types';
import { pageVariables, post } from '.';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import { PAGES } from '../../../../content-strings';
import companiesHouseValidation from './validation/companies-house';
import companyDetailsValidation from './validation/company-details';
import { mockReq, mockRes, mockApplication, mockPhoneNumbers, mockCompany } from '../../../../test-mocks';
import { sanitiseValue } from '../../../../helpers/sanitise-data';
import mapAndSave from '../map-and-save';
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
  INSURANCE_ROOT,
  EXPORTER_BUSINESS: { NATURE_OF_BUSINESS_ROOT, CHECK_YOUR_ANSWERS, COMPANY_DETAILS_CHANGE, COMPANY_DETAILS_ROOT },
} = ROUTES.INSURANCE;

jest.mock('../map-and-save');

describe('controllers/insurance/business/companies-details', () => {
  let req: Request;
  let res: Response;

  const getCompaniesHouseResponse = jest.fn(() => Promise.resolve(mockCompany));
  api.keystone.getCompaniesHouseInformation = getCompaniesHouseResponse;

  mapAndSave.companyDetails = jest.fn(() => Promise.resolve(true));

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
          [TRADING_NAME]: sanitiseValue(TRADING_NAME, req.body[TRADING_NAME]),
          [TRADING_ADDRESS]: sanitiseValue(TRADING_ADDRESS, req.body[TRADING_ADDRESS]),
          [WEBSITE]: req.body[WEBSITE],
        };

        await post(req, res);

        let validationErrors = companiesHouseValidation(req.body);
        validationErrors = companyDetailsValidation(req.body, validationErrors);

        expect(res.render).toHaveBeenCalledWith(companyDetailsTemplate, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(mockApplication.referenceNumber, COMPANY_DETAILS_ROOT),
          validationErrors,
          submittedValues,
        });
      });
    });

    describe('when there are no validation errors', () => {
      describe('when the originalUrl contains change', () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
          req.body = {
            [INPUT]: '8989898',
            [TRADING_NAME]: 'true',
            [TRADING_ADDRESS]: 'false',
            [PHONE_NUMBER]: VALID_PHONE_NUMBERS.LANDLINE,
          };

          req.originalUrl = COMPANY_DETAILS_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${CHECK_YOUR_ANSWERS}`;
          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe('when the originalUrl does not contain change', () => {
        it('should redirect to next page', async () => {
          req.body = {
            [INPUT]: '8989898',
            [TRADING_NAME]: 'true',
            [TRADING_ADDRESS]: 'false',
            [PHONE_NUMBER]: VALID_PHONE_NUMBERS.LANDLINE,
          };

          req.originalUrl = `insurance/${mockApplication.referenceNumber}/${COMPANY_DETAILS_ROOT}`;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${NATURE_OF_BUSINESS_ROOT}`;
          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      it('should call mapAndSave.companyDetails once with updateBody and application', async () => {
        req.body = {
          [INPUT]: '8989898',
          [TRADING_NAME]: 'true',
          [TRADING_ADDRESS]: 'false',
          [PHONE_NUMBER]: VALID_PHONE_NUMBERS.LANDLINE,
        };

        await post(req, res);

        expect(mapAndSave.companyDetails).toHaveBeenCalledTimes(1);

        const updateBody = {
          ...req.body,
          ...mockCompany,
        };
        expect(mapAndSave.companyDetails).toHaveBeenCalledWith(updateBody, mockApplication);
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

    describe('api error handling', () => {
      describe('when mapAndSave.companyDetails returns an error', () => {
        it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, () => {
          res.locals = { csrfToken: '1234' };
          mapAndSave.companyDetails = jest.fn(() => Promise.reject());

          post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
        });
      });

      describe('when mapAndSave.companyDetails resolves false', () => {
        it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, () => {
          res.locals = { csrfToken: '1234' };
          mapAndSave.companyDetails = jest.fn(() => Promise.resolve(false));

          post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
        });
      });
    });
  });
});
