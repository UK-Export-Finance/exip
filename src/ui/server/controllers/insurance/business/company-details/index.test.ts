import { TEMPLATE, FIELD_IDS, pageVariables, HTML_FLAGS, get, post } from '.';
import { ROUTES, TEMPLATES } from '../../../../constants';
import BUSINESS_FIELD_IDS from '../../../../constants/field-ids/insurance/business';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { PAGES } from '../../../../content-strings';
import constructPayload from '../../../../helpers/construct-payload';
import { sanitiseValue } from '../../../../helpers/sanitise-data';
import mapAndSave from '../map-and-save/company-details';
import { companiesHouseSummaryList } from '../../../../helpers/summary-lists/companies-house';
import generateValidationErrors from './validation';
import { Application, Request, ResponseInsurance } from '../../../../../types';
import { mockReq, mockResInsurance, mockApplication, mockPhoneNumbers, mockSpyPromiseRejection, referenceNumber } from '../../../../test-mocks';

const {
  YOUR_COMPANY: { HAS_DIFFERENT_TRADING_NAME, HAS_DIFFERENT_TRADING_ADDRESS, WEBSITE, PHONE_NUMBER, DIFFERENT_TRADING_NAME },
} = BUSINESS_FIELD_IDS;

const { COMPANY_DETAILS } = PAGES.INSURANCE.EXPORTER_BUSINESS;
const { COMPANY_DETAILS: companyDetailsTemplate } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

const { VALID_PHONE_NUMBERS } = mockPhoneNumbers;

const {
  INSURANCE_ROOT,
  EXPORTER_BUSINESS: {
    COMPANY_DETAILS_SAVE_AND_BACK,
    ALTERNATIVE_TRADING_ADDRESS_ROOT,
    NATURE_OF_BUSINESS_ROOT,
    CHECK_YOUR_ANSWERS,
    COMPANY_DETAILS_CHANGE,
    COMPANY_DETAILS_ROOT,
    COMPANY_DETAILS_CHECK_AND_CHANGE,
    ALTERNATIVE_TRADING_ADDRESS_CHANGE,
    ALTERNATIVE_TRADING_ADDRESS_CHECK_AND_CHANGE,
  },
  CHECK_YOUR_ANSWERS: { YOUR_BUSINESS: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = ROUTES.INSURANCE;

const IS_APPLICATION_SUMMARY_LIST = true;

const applicationWithoutDifferentTradingAddress = {
  ...mockApplication,
  company: {
    ...mockApplication.company,
    differentTradingAddress: { id: '' },
  },
};

describe('controllers/insurance/business/companies-details', () => {
  let req: Request;
  let res: ResponseInsurance;

  beforeEach(() => {
    req = mockReq();
    res = mockResInsurance();
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
      const expected = [HAS_DIFFERENT_TRADING_NAME, HAS_DIFFERENT_TRADING_ADDRESS, WEBSITE, PHONE_NUMBER, DIFFERENT_TRADING_NAME];

      expect(FIELD_IDS).toEqual(expected);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(referenceNumber);

      const expected = {
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_DETAILS_SAVE_AND_BACK}`,
        DIFFERENT_COMPANIES_HOUSE_NUMBER_URL: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_DETAILS_ROOT}`,
        FIELDS: BUSINESS_FIELD_IDS,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('HTML_FLAGS', () => {
    it('should have correct properties', () => {
      const expected = {
        HORIZONTAL_RADIOS: true,
        NO_RADIO_AS_FIRST_OPTION: true,
      };

      expect(HTML_FLAGS).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      const mappedApplication = mapApplicationToFormFields(mockApplication) as Application;

      const { company } = mappedApplication;

      const submittedValues = {
        [HAS_DIFFERENT_TRADING_NAME]: company?.[HAS_DIFFERENT_TRADING_NAME],
        [HAS_DIFFERENT_TRADING_ADDRESS]: company?.[HAS_DIFFERENT_TRADING_ADDRESS],
        [WEBSITE]: company?.[WEBSITE],
        [PHONE_NUMBER]: company?.[PHONE_NUMBER],
        [DIFFERENT_TRADING_NAME]: company?.[DIFFERENT_TRADING_NAME],
      };

      expect(res.render).toHaveBeenCalledWith(companyDetailsTemplate, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
          BACK_LINK: req.headers.referer,
          HTML_FLAGS,
        }),
        userName: getUserNameFromSession(req.session.user),
        ...pageVariables(referenceNumber),
        submittedValues,
        SUMMARY_LIST: companiesHouseSummaryList(company, IS_APPLICATION_SUMMARY_LIST),
      });
    });
  });

  describe('post', () => {
    mapAndSave.companyDetails = jest.fn(() => Promise.resolve(true));

    const validBody = {
      [HAS_DIFFERENT_TRADING_NAME]: 'true',
      [HAS_DIFFERENT_TRADING_ADDRESS]: 'false',
      [PHONE_NUMBER]: VALID_PHONE_NUMBERS.LANDLINE,
      [DIFFERENT_TRADING_NAME]: 'test',
    };

    describe('when there are validation errors', () => {
      it('should render template with validation errors and submitted values', async () => {
        req.body = {};

        const payload = constructPayload(req.body, FIELD_IDS);

        const mappedApplication = mapApplicationToFormFields(mockApplication) as Application;

        const expectedSubmittedValues = {
          [HAS_DIFFERENT_TRADING_NAME]: sanitiseValue({ key: HAS_DIFFERENT_TRADING_NAME, value: payload[HAS_DIFFERENT_TRADING_NAME] }),
          [HAS_DIFFERENT_TRADING_ADDRESS]: sanitiseValue({ key: HAS_DIFFERENT_TRADING_ADDRESS, value: payload[HAS_DIFFERENT_TRADING_ADDRESS] }),
          [WEBSITE]: payload[WEBSITE],
          [PHONE_NUMBER]: payload[PHONE_NUMBER],
          [DIFFERENT_TRADING_NAME]: payload[DIFFERENT_TRADING_NAME],
        };

        await post(req, res);

        const validationErrors = generateValidationErrors(payload);

        expect(res.render).toHaveBeenCalledWith(companyDetailsTemplate, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: COMPANY_DETAILS,
            BACK_LINK: req.headers.referer,
            HTML_FLAGS,
          }),
          userName: getUserNameFromSession(req.session.user),
          ...pageVariables(referenceNumber),
          validationErrors,
          submittedValues: expectedSubmittedValues,
          SUMMARY_LIST: companiesHouseSummaryList(mappedApplication.company, IS_APPLICATION_SUMMARY_LIST),
        });
      });
    });

    describe('when there are no validation errors', () => {
      it('should redirect to next page', async () => {
        req.body = validBody;
        req.originalUrl = `insurance/${referenceNumber}/${COMPANY_DETAILS_ROOT}`;

        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${referenceNumber}${NATURE_OF_BUSINESS_ROOT}`;
        expect(res.redirect).toHaveBeenCalledWith(expected);
      });

      it('should call mapAndSave.companyDetails once with data from constructPayload function and application', async () => {
        req.body = {
          ...validBody,
          injection: 1,
        };

        await post(req, res);

        expect(mapAndSave.companyDetails).toHaveBeenCalledTimes(1);

        const payload = constructPayload(req.body, FIELD_IDS);

        expect(mapAndSave.companyDetails).toHaveBeenCalledWith(payload, mockApplication);
      });

      describe('when an application does NOT have application.company.differentTradingAddress.fullAddress', () => {
        beforeEach(() => {
          res.locals.application = applicationWithoutDifferentTradingAddress;
        });

        describe(`when req.body has ${HAS_DIFFERENT_TRADING_ADDRESS} with a value of 'true'`, () => {
          describe('when the route is NOT a check or check-and-change route', () => {
            it(`should redirect to ${ALTERNATIVE_TRADING_ADDRESS_ROOT}`, async () => {
              req.body = {
                ...validBody,
                [HAS_DIFFERENT_TRADING_ADDRESS]: 'true',
              };

              await post(req, res);

              const expected = `${INSURANCE_ROOT}/${referenceNumber}${ALTERNATIVE_TRADING_ADDRESS_ROOT}`;
              expect(res.redirect).toHaveBeenCalledWith(expected);
            });
          });

          describe('when the route is a is a check route', () => {
            it(`should redirect to ${ALTERNATIVE_TRADING_ADDRESS_CHANGE}`, async () => {
              req.body = {
                ...validBody,
                [HAS_DIFFERENT_TRADING_ADDRESS]: 'true',
              };

              req.originalUrl = COMPANY_DETAILS_CHANGE;

              await post(req, res);

              const expected = `${INSURANCE_ROOT}/${referenceNumber}${ALTERNATIVE_TRADING_ADDRESS_CHANGE}`;
              expect(res.redirect).toHaveBeenCalledWith(expected);
            });
          });

          describe('when the route is a check-and-change route', () => {
            it(`should redirect to ${ALTERNATIVE_TRADING_ADDRESS_CHECK_AND_CHANGE}`, async () => {
              req.body = {
                ...validBody,
                [HAS_DIFFERENT_TRADING_ADDRESS]: 'true',
              };

              req.originalUrl = COMPANY_DETAILS_CHECK_AND_CHANGE;

              await post(req, res);

              const expected = `${INSURANCE_ROOT}/${referenceNumber}${ALTERNATIVE_TRADING_ADDRESS_CHECK_AND_CHANGE}`;
              expect(res.redirect).toHaveBeenCalledWith(expected);
            });
          });
        });
      });

      describe("when the url's last substring is `change`", () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
          req.body = {
            ...validBody,
            [HAS_DIFFERENT_TRADING_ADDRESS]: 'false',
          };

          req.originalUrl = COMPANY_DETAILS_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe("when the url's last substring is `check-and-change`", () => {
        it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
          req.body = {
            ...validBody,
            [HAS_DIFFERENT_TRADING_ADDRESS]: 'false',
          };

          req.originalUrl = COMPANY_DETAILS_CHECK_AND_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });
    });

    describe('api error handling', () => {
      describe('when mapAndSave.companyDetails returns an error', () => {
        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          req.body = validBody;

          mapAndSave.companyDetails = mockSpyPromiseRejection;

          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });

      describe('when mapAndSave.companyDetails resolves false', () => {
        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          req.body = validBody;

          mapAndSave.companyDetails = jest.fn(() => Promise.resolve(false));

          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });
    });
  });
});
