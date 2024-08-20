import { FIELD_ID, PAGE_VARIABLES, PAGE_CONTENT_STRINGS, TEMPLATE, get, post } from '.';
import { PAGES } from '../../../../content-strings';
import { FIELDS_ELIGIBILITY as FIELDS } from '../../../../content-strings/fields/insurance/eligibility';
import { ERROR_MESSAGES } from '../../../../content-strings/error-messages';
import { ROUTES, TEMPLATES } from '../../../../constants';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from '../../../../helpers/companies-house-search/validation';
import generateValidationErrorsHelper from '../../../../helpers/validation';
import companiesHouse from '../../../../helpers/companies-house-search';
import mapCompaniesHouseData from '../../../../helpers/mappings/map-companies-house-data';
import saveData from '../save-data/companies-house-search-data';
import { CompaniesHouseResponse, Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockCompaniesHouseResponse, mockCompany, referenceNumber, mockSpyPromiseRejection } from '../../../../test-mocks';

const {
  ELIGIBILITY: {
    COMPANIES_HOUSE: { COMPANY_NUMBER },
  },
} = INSURANCE_FIELD_IDS;

const {
  PROBLEM_WITH_SERVICE,
  INSURANCE: {
    ELIGIBILITY: { COMPANY_NOT_ACTIVE, COMPANIES_HOUSE_UNAVAILABLE },
    EXPORTER_BUSINESS: { COMPANY_DETAILS_ROOT },
    INSURANCE_ROOT,
  },
} = ROUTES;

describe('controllers/insurance/business/companies-house-search', () => {
  let req: Request;
  let res: Response;

  jest.mock('../../../../helpers/companies-house-search');

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('FIELD_ID', () => {
    it('should have the correct ID', () => {
      expect(FIELD_ID).toEqual(COMPANY_NUMBER);
    });
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELD: {
          ID: FIELD_ID,
          ...FIELDS[FIELD_ID],
        },
      };

      expect(PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.EXPORTER_BUSINESS.ENTER_COMPANIES_HOUSE_NUMBER);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.EXPORTER_BUSINESS.ENTER_COMPANIES_HOUSE_NUMBER);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
        ...PAGE_VARIABLES,
      });
    });
  });

  describe('post', () => {
    const validBody = {
      [FIELD_ID]: mockCompany.companyNumber,
    };

    companiesHouse.search = jest.fn(() => Promise.resolve(mockCompaniesHouseResponse));
    saveData.companyDetailsPostMigration = jest.fn(() => Promise.resolve(true));

    describe('when there are validation errors', () => {
      it('should render template with validation errors from constructPayload function', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, [FIELD_ID]);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS,
            BACK_LINK: req.headers.referer,
          }),
          userName: getUserNameFromSession(req.session.user),
          ...PAGE_VARIABLES,
          validationErrors: generateValidationErrors(payload),
          submittedValues: payload,
        });
      });
    });

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

      it('should call companiesHouse.search once with data from constructPayload function', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, [FIELD_ID]);

        expect(companiesHouse.search).toHaveBeenCalledTimes(1);
        expect(companiesHouse.search).toHaveBeenCalledWith(payload[FIELD_ID]);
      });

      it('should call saveData.companyDetailsPostMigration with mapped company data', async () => {
        await post(req, res);

        const mappedData = mapCompaniesHouseData(mockCompaniesHouseResponse);

        expect(saveData.companyDetailsPostMigration).toHaveBeenCalledTimes(1);
        expect(saveData.companyDetailsPostMigration).toHaveBeenCalledWith(res.locals.application, mappedData);
      });

      it(`should redirect to ${COMPANY_DETAILS_ROOT}`, async () => {
        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_DETAILS_ROOT}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });

      describe('when companiesHouse.search returns isActive=false', () => {
        it(`should redirect to ${COMPANY_NOT_ACTIVE}`, async () => {
          req.body = validBody;

          const mockResponse = {
            ...mockCompaniesHouseResponse,
            apiError: false,
            isActive: false,
          } as CompaniesHouseResponse;

          companiesHouse.search = jest.fn(() => Promise.resolve(mockResponse));

          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(COMPANY_NOT_ACTIVE);
        });
      });
    });

    describe('api error handling', () => {
      describe('when companiesHouse.search returns notFound=true', () => {
        it('should render template with validation errors', async () => {
          req.body = validBody;

          const mockResponse = {
            ...mockCompaniesHouseResponse,
            notFound: true,
          } as CompaniesHouseResponse;

          companiesHouse.search = jest.fn(() => Promise.resolve(mockResponse));

          await post(req, res);

          const payload = constructPayload(req.body, [FIELD_ID]);

          const expectedErrorMessage = ERROR_MESSAGES.INSURANCE.ELIGIBILITY[FIELD_ID].NOT_FOUND;

          expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
            ...insuranceCorePageVariables({
              PAGE_CONTENT_STRINGS,
              BACK_LINK: req.headers.referer,
            }),
            userName: getUserNameFromSession(req.session.user),
            ...PAGE_VARIABLES,
            validationErrors: generateValidationErrorsHelper(FIELD_ID, expectedErrorMessage, {}),
            submittedValues: payload,
          });
        });
      });

      describe('when companiesHouse.search returns apiError=true', () => {
        it(`should redirect to ${COMPANIES_HOUSE_UNAVAILABLE}`, async () => {
          req.body = validBody;

          const mockResponse = {
            ...mockCompaniesHouseResponse,
            apiError: true,
          } as CompaniesHouseResponse;

          companiesHouse.search = jest.fn(() => Promise.resolve(mockResponse));

          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(COMPANIES_HOUSE_UNAVAILABLE);
        });
      });

      describe('when saveData.companyDetailsPostMigration returns false', () => {
        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          req.body = validBody;

          companiesHouse.search = jest.fn(() => Promise.resolve(mockCompaniesHouseResponse));
          saveData.companyDetailsPostMigration = jest.fn(() => Promise.resolve(false));

          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });

      describe('when there is an error with companiesHouse.search', () => {
        beforeEach(() => {
          companiesHouse.search = mockSpyPromiseRejection;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          req.body = validBody;

          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });

      describe('when there is an error with saveData.companyDetailsPostMigration', () => {
        beforeEach(() => {
          companiesHouse.search = jest.fn(() => Promise.resolve(mockCompaniesHouseResponse));
          saveData.companyDetailsPostMigration = mockSpyPromiseRejection;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          req.body = validBody;

          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });
    });
  });
});
