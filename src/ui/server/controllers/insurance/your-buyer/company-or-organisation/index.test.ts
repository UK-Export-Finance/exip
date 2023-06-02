import { get, post, pageVariables, TEMPLATE } from '.';
import { PAGES } from '../../../../content-strings';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import yourBuyerDetailsValidation from './validation';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import mapAndSave from '../map-and-save';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication, mockBuyer } from '../../../../test-mocks';

const {
  YOUR_BUYER: { COMPANY_OR_ORGANISATION },
} = FIELD_IDS.INSURANCE;

const {
  INSURANCE_ROOT,
  YOUR_BUYER: YOUR_BUYER_ROUTES,
  CHECK_YOUR_ANSWERS: { YOUR_BUYER: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = ROUTES.INSURANCE;

const {
  WORKING_WITH_BUYER,
  COMPANY_OR_ORGANISATION_SAVE_AND_BACK,
  CHECK_YOUR_ANSWERS,
  COMPANY_OR_ORGANISATION_CHANGE,
  COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE,
} = YOUR_BUYER_ROUTES;

const { NAME, ADDRESS, COUNTRY, REGISTRATION_NUMBER, WEBSITE, FIRST_NAME, LAST_NAME, POSITION, EMAIL, CAN_CONTACT_BUYER } = COMPANY_OR_ORGANISATION;

describe('controllers/insurance/your-buyer/company-or-organisation', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplication;
    req.params.referenceNumber = String(mockApplication.referenceNumber);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELDS: {
          NAME: {
            ID: NAME,
            ...FIELDS.COMPANY_OR_ORGANISATION[NAME],
          },
          ADDRESS: {
            ID: ADDRESS,
            ...FIELDS.COMPANY_OR_ORGANISATION[ADDRESS],
          },
          COUNTRY: {
            ID: COUNTRY,
            ...FIELDS.COMPANY_OR_ORGANISATION[COUNTRY],
          },
          REGISTRATION_NUMBER: {
            ID: REGISTRATION_NUMBER,
            ...FIELDS.COMPANY_OR_ORGANISATION[REGISTRATION_NUMBER],
          },
          WEBSITE: {
            ID: WEBSITE,
            ...FIELDS.COMPANY_OR_ORGANISATION[WEBSITE],
          },
          FIRST_NAME: {
            ID: FIRST_NAME,
            ...FIELDS.COMPANY_OR_ORGANISATION[FIRST_NAME],
          },
          LAST_NAME: {
            ID: LAST_NAME,
            ...FIELDS.COMPANY_OR_ORGANISATION[LAST_NAME],
          },
          POSITION: {
            ID: POSITION,
            ...FIELDS.COMPANY_OR_ORGANISATION[POSITION],
          },
          EMAIL: {
            ID: EMAIL,
            ...FIELDS.COMPANY_OR_ORGANISATION[EMAIL],
          },
          CAN_CONTACT_BUYER: {
            ID: CAN_CONTACT_BUYER,
            ...FIELDS.COMPANY_OR_ORGANISATION[CAN_CONTACT_BUYER],
          },
        },
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${COMPANY_OR_ORGANISATION_SAVE_AND_BACK}`,
      };

      expect(pageVariables(mockApplication.referenceNumber)).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION);
    });
  });

  describe('get', () => {
    it('should render template', async () => {
      await get(req, res);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION,
          BACK_LINK: req.headers.referer,
        }),
        application: mapApplicationToFormFields(mockApplication),
        userName: getUserNameFromSession(req.session.user),
        ...pageVariables(mockApplication.referenceNumber),
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });

    describe('api error handling', () => {
      describe('when there is no application', () => {
        beforeEach(() => {
          res.locals = { csrfToken: '1234' };
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, () => {
          get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });
    });
  });

  describe('post', () => {
    beforeEach(() => {
      mapAndSave.yourBuyer = jest.fn(() => Promise.resolve(true));
    });

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        const { exporterIsConnectedWithBuyer, exporterHasTradedWithBuyer, ...companyOrOrganisationMock } = mockBuyer;
        req.body = companyOrOrganisationMock;
      });

      it('should redirect to the next page', async () => {
        await post(req, res);
        const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${WORKING_WITH_BUYER}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });

      it('should call mapAndSave.buyer once with buyer and application', async () => {
        req.body = mockBuyer;

        await post(req, res);

        expect(mapAndSave.yourBuyer).toHaveBeenCalledTimes(1);

        expect(mapAndSave.yourBuyer).toHaveBeenCalledWith(req.body, mockApplication);
      });

      describe("when the url's last substring is `change`", () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
          const { exporterIsConnectedWithBuyer, exporterHasTradedWithBuyer, ...mockCompanyOrOrganisation } = mockBuyer;
          req.body = mockCompanyOrOrganisation;

          req.originalUrl = COMPANY_OR_ORGANISATION_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${CHECK_YOUR_ANSWERS}`;
          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe("when the url's last substring is `check-and-change`", () => {
        it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
          const { exporterIsConnectedWithBuyer, exporterHasTradedWithBuyer, ...mockCompanyOrOrganisation } = mockBuyer;

          req.body = mockCompanyOrOrganisation;

          req.originalUrl = COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${CHECK_AND_CHANGE_ROUTE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });
    });

    describe('when there are validation errors', () => {
      it('should render template with validation errors', async () => {
        await post(req, res);
        const validationErrors = yourBuyerDetailsValidation(req.body);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: PAGES.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION,
            BACK_LINK: req.headers.referer,
          }),
          userName: getUserNameFromSession(req.session.user),
          ...pageVariables(mockApplication.referenceNumber),
          submittedValues: req.body,
          validationErrors,
        };
        expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
      });
    });

    describe('api error handling', () => {
      describe('when application does not exist', () => {
        beforeEach(() => {
          res.locals = { csrfToken: '1234' };
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, () => {
          post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });
    });
  });
});
