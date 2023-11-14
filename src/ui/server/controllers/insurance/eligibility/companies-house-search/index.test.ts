import { FIELD_ID, PAGE_VARIABLES, PAGE_CONTENT_STRINGS, TEMPLATE, get, post } from '.';
import { PAGES } from '../../../../content-strings';
import { FIELDS_ELIGIBILITY as FIELDS } from '../../../../content-strings/fields/insurance/eligibility';
import { ROUTES, TEMPLATES } from '../../../../constants';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from '../../../../helpers/companies-house-search/validation';
import companiesHouse from '../../../../helpers/companies-house-search';
import mapCompaniesHouseData from '../../../../helpers/mappings/map-companies-house-data';
import { updateSubmittedData } from '../../../../helpers/update-submitted-data/insurance';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockCompany } from '../../../../test-mocks';

const {
  ELIGIBILITY: { COMPANIES_HOUSE_NUMBER },
} = INSURANCE_FIELD_IDS;

const {
  PROBLEM_WITH_SERVICE,
  INSURANCE: {
    ELIGIBILITY: { COMPANY_DETAILS, COMPANY_NOT_ACTIVE, COMPANIES_HOUSE_UNAVAILABLE },
  },
} = ROUTES;

describe('controllers/insurance/eligibility/companies-house-search', () => {
  let req: Request;
  let res: Response;

  jest.mock('../../../../helpers/companies-house-search');

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('FIELD_ID', () => {
    it('should have the correct ID', () => {
      expect(FIELD_ID).toEqual(COMPANIES_HOUSE_NUMBER);
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
    it('should have the correct template defined', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_SEARCH);
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
        submittedValues: {},
      });
    });

    describe('when req.session.submittedData.insuranceEligibility has a populated company object', () => {
      it('should render template with insuranceEligibility.company as submittedValues', () => {
        req.session.submittedData.insuranceEligibility = {
          company: {},
        };

        get(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS,
            BACK_LINK: req.headers.referer,
          }),
          userName: getUserNameFromSession(req.session.user),
          ...PAGE_VARIABLES,
          submittedValues: req.session.submittedData.insuranceEligibility.company,
        });
      });
    });
  });

  describe('post', () => {
    const validBody = {
      [FIELD_ID]: mockCompany.companyNumber,
    };

    const mockCompaniesHouseResponse = {
      __typename: 'CompaniesHouseResponse',
      isActive: true,
      company: mockCompany,
      companyNumber: mockCompany.companyNumber,
    };

    companiesHouse.search = jest.fn(() => Promise.resolve(mockCompaniesHouseResponse));

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
        expect(companiesHouse.search).toHaveBeenCalledWith(payload);
      });

      it('should update the session with populated company object', async () => {
        await post(req, res);

        const expectedPopulatedData = {
          company: mapCompaniesHouseData(mockCompaniesHouseResponse.company),
        };

        const expected = {
          ...req.session.submittedData,
          insuranceEligibility: updateSubmittedData(expectedPopulatedData, req.session.submittedData.insuranceEligibility),
        };

        expect(req.session.submittedData).toEqual(expected);
      });

      it(`should redirect to ${COMPANY_DETAILS}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(COMPANY_DETAILS);
      });

      describe('when companiesHouse.search returns isActive=false', () => {
        it(`should redirect to ${COMPANY_NOT_ACTIVE}`, async () => {
          req.body = validBody;

          const mockResponse = {
            companyNumber: mockCompaniesHouseResponse.companyNumber,
            validationErrors: false,
            apiError: false,
            isActive: false,
          };

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
            notFound: true,
          };

          companiesHouse.search = jest.fn(() => Promise.resolve(mockResponse));

          await post(req, res);

          const payload = constructPayload(req.body, [FIELD_ID]);

          expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
            ...insuranceCorePageVariables({
              PAGE_CONTENT_STRINGS,
              BACK_LINK: req.headers.referer,
            }),
            userName: getUserNameFromSession(req.session.user),
            ...PAGE_VARIABLES,
            validationErrors: generateValidationErrors({}),
            submittedValues: payload,
          });
        });
      });

      describe('when companiesHouse.search returns apiError=true', () => {
        it(`should redirect to ${COMPANIES_HOUSE_UNAVAILABLE}`, async () => {
          req.body = validBody;

          const mockResponse = {
            companyNumber: mockCompaniesHouseResponse.companyNumber,
            validationErrors: {},
            apiError: true,
          };

          companiesHouse.search = jest.fn(() => Promise.resolve(mockResponse));

          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(COMPANIES_HOUSE_UNAVAILABLE);
        });
      });

      describe('when there is an error', () => {
        beforeEach(() => {
          companiesHouse.search = jest.fn(() => Promise.reject(new Error('mock')));
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
