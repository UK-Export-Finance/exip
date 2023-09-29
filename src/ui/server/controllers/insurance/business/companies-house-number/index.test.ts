import { pageVariables, get, redirectToExitPage, post, TEMPLATE, FIELD_ID } from '.';
import { ROUTES, TEMPLATES } from '../../../../constants';
import { FIELDS } from '../../../../content-strings/fields/insurance';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import BUSINESS_FIELD_IDS from '../../../../constants/field-ids/insurance/business';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { PAGES } from '../../../../content-strings';
import constructPayload from '../../../../helpers/construct-payload';
import api from '../../../../api';
import { mockReq, mockRes, mockCompany, mockApplication } from '../../../../test-mocks';
import { Request, Response } from '../../../../../types';
import mapAndSave from '../map-and-save/company-details';
import companiesHouseValidation from './validation/companies-house';

const {
  COMPANIES_HOUSE_NUMBER,
  COMPANY_HOUSE: { COMPANY_NUMBER },
} = BUSINESS_FIELD_IDS;

const { COMPANIES_HOUSE_NUMBER: CONTENT_STRINGS } = PAGES.INSURANCE.EXPORTER_BUSINESS;
const { COMPANIES_HOUSE_NUMBER: COMPANIES_HOUSE_NUMBER_TEMPLATE } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

const {
  INSURANCE_ROOT,
  EXPORTER_BUSINESS,
  PROBLEM_WITH_SERVICE,
  CHECK_YOUR_ANSWERS: { YOUR_BUSINESS: CHECK_AND_CHANGE_ROUTE },
} = ROUTES.INSURANCE;

const {
  COMPANIES_HOUSE_NUMBER_SAVE_AND_BACK,
  COMPANIES_HOUSE_UNAVAILABLE,
  CHECK_YOUR_ANSWERS,
  COMPANY_DETAILS,
  NO_COMPANIES_HOUSE_NUMBER,
  COMPANIES_HOUSE_NUMBER_CHANGE,
  COMPANIES_HOUSE_NUMBER_CHECK_AND_CHANGE,
} = EXPORTER_BUSINESS;

const { COMPANIES_HOUSE_NUMBER: COMPANIES_HOUSE_NUMBER_FIELDS } = FIELDS;

jest.mock('../map-and-save/company-details');

describe('controllers/insurance/business/companies-house-number', () => {
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
      expect(TEMPLATE).toEqual(COMPANIES_HOUSE_NUMBER_TEMPLATE);
    });
  });

  describe('FIELD_ID', () => {
    it('should have the correct FIELD_IDS', () => {
      expect(FIELD_ID).toEqual(COMPANIES_HOUSE_NUMBER);
    });
  });

  describe('pageVariables', () => {
    const result = pageVariables(mockApplication.referenceNumber);

    it('should have correct properties', () => {
      const expected = {
        FIELDS: {
          COMPANIES_HOUSE_NUMBER: {
            ID: COMPANIES_HOUSE_NUMBER,
            ...COMPANIES_HOUSE_NUMBER_FIELDS[COMPANIES_HOUSE_NUMBER],
          },
        },
        EXIT_PAGE_URL: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${NO_COMPANIES_HOUSE_NUMBER}`,
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${COMPANIES_HOUSE_NUMBER_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render the broker template with correct variables', () => {
      get(req, res);

      const submittedValues = {
        [COMPANIES_HOUSE_NUMBER]: mockApplication?.company?.[COMPANY_NUMBER],
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(mockApplication),
        submittedValues,
        ...pageVariables(mockApplication.referenceNumber),
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

  describe('post', () => {
    const getCompaniesHouseResponse = jest.fn(() => Promise.resolve(mockCompany));
    api.keystone.getCompaniesHouseInformation = getCompaniesHouseResponse;

    mapAndSave.companyDetails = jest.fn(() => Promise.resolve(true));

    const validBody = {
      [COMPANIES_HOUSE_NUMBER]: '8989898',
    };

    describe('when there are validation errors', () => {
      it('should render template with validation errors and submitted values', async () => {
        req.body = {};

        const payload = constructPayload(req.body, [FIELD_ID]);

        const expectedSubmittedValues = {
          [COMPANIES_HOUSE_NUMBER]: payload[COMPANIES_HOUSE_NUMBER],
        };

        await post(req, res);

        const validationErrors = companiesHouseValidation(payload);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: CONTENT_STRINGS,
            BACK_LINK: req.headers.referer,
          }),
          userName: getUserNameFromSession(req.session.user),
          submittedValues: expectedSubmittedValues,
          validationErrors,
          ...pageVariables(mockApplication.referenceNumber),
        });
      });
    });

    describe('when there are no validation errors', () => {
      it('should redirect to next page', async () => {
        req.body = validBody;

        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${COMPANY_DETAILS}`;
        expect(res.redirect).toHaveBeenCalledWith(expected);
      });

      it('should call mapAndSave.companyDetails once with data from constructPayload function and application', async () => {
        req.body = {
          ...validBody,
        };

        await post(req, res);

        expect(mapAndSave.companyDetails).toHaveBeenCalledTimes(1);

        const payload = constructPayload(req.body, [FIELD_ID]);

        const updateBody = {
          ...payload,
          ...mockCompany,
        };

        expect(mapAndSave.companyDetails).toHaveBeenCalledWith(updateBody, mockApplication);
      });

      describe("when the url's last substring is `change`", () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
          req.body = validBody;

          req.originalUrl = COMPANIES_HOUSE_NUMBER_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${CHECK_YOUR_ANSWERS}`;
          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe("when the url's last substring is `check-and-change`", () => {
        it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
          req.body = validBody;
          req.originalUrl = COMPANIES_HOUSE_NUMBER_CHECK_AND_CHANGE;

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

          api.keystone.getCompaniesHouseInformation = getCompaniesHouseResponse;
          mapAndSave.companyDetails = jest.fn(() => Promise.reject(new Error('mock')));

          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });

      describe('when getCompaniesHouseResponse returns an error', () => {
        it(`should redirect to ${COMPANIES_HOUSE_UNAVAILABLE}`, async () => {
          req.body = validBody;

          api.keystone.getCompaniesHouseInformation = jest.fn(() => Promise.resolve({ apiError: true }));

          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${mockApplication.referenceNumber}${COMPANIES_HOUSE_UNAVAILABLE}`);
        });
      });

      describe('when mapAndSave.companyDetails resolves false', () => {
        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          req.body = validBody;

          res.locals = mockRes().locals;

          api.keystone.getCompaniesHouseInformation = jest.fn(() => Promise.resolve({ apiError: false }));
          mapAndSave.companyDetails = jest.fn(() => Promise.resolve(false));

          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });
    });
  });
});
