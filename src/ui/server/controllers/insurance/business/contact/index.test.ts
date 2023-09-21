import { PAGES } from '../../../../content-strings';
import { pageVariables, get, post, TEMPLATE, FIELD_IDS } from '.';
import { TEMPLATES, ROUTES } from '../../../../constants';
import BUSINESS_FIELD_IDS from '../../../../constants/field-ids/insurance/business';
import ACCOUNT_FIELD_IDS from '../../../../constants/field-ids/insurance/account';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import { FIELDS, ACCOUNT_FIELDS } from '../../../../content-strings/fields/insurance';
import mapAndSave from '../map-and-save/contact';
import getFromSessionOrApplication from '../../../../helpers/get-values-from-user-session-or-application';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication, mockContact } from '../../../../test-mocks';

const { BUSINESS } = BUSINESS_FIELD_IDS;
const { COMPANY_NAME, POSITION, BUSINESS_CONTACT_DETAIL } = BUSINESS_FIELD_IDS.CONTACT;
const { FIRST_NAME, LAST_NAME, EMAIL } = ACCOUNT_FIELD_IDS;

const { CONTACT } = PAGES.INSURANCE.EXPORTER_BUSINESS;
const { CONTACT: CONTACT_TEMPLATE } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

const {
  INSURANCE_ROOT,
  EXPORTER_BUSINESS: EXPORTER_BUSINESS_ROUTES,
  CHECK_YOUR_ANSWERS: { YOUR_BUSINESS: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = ROUTES.INSURANCE;

const { CONTACT_SAVE_AND_BACK, NATURE_OF_BUSINESS_ROOT, CONTACT_CHANGE, CONTACT_CHECK_AND_CHANGE, CHECK_YOUR_ANSWERS } = EXPORTER_BUSINESS_ROUTES;

const { CONTACT: CONTACT_FIELDS } = FIELDS;

describe('controllers/insurance/business/contact', () => {
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

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(CONTACT_TEMPLATE);
    });
  });

  describe('FIELD_IDS', () => {
    it('should have the correct FIELD_IDS', () => {
      expect(FIELD_IDS).toEqual([FIRST_NAME, LAST_NAME, EMAIL, POSITION]);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(mockApplication.referenceNumber);

      const expected = {
        FIELDS: {
          COMPANY_NAME: {
            ID: COMPANY_NAME,
            ...CONTACT_FIELDS[COMPANY_NAME],
          },
          FIRST_NAME: {
            ID: FIRST_NAME,
            ...ACCOUNT_FIELDS[FIRST_NAME],
          },
          LAST_NAME: {
            ID: LAST_NAME,
            ...ACCOUNT_FIELDS[LAST_NAME],
          },
          EMAIL_ADDRESS: {
            ID: EMAIL,
            ...ACCOUNT_FIELDS[EMAIL],
          },
          POSITION: {
            ID: POSITION,
            ...CONTACT_FIELDS[POSITION],
          },
        },
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${CONTACT_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render the contact template with correct variables', () => {
      res.locals.application = mockApplication;

      get(req, res);

      expect(res.render).toHaveBeenCalledWith(CONTACT_TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: CONTACT,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(mockApplication),
        submittedValues: getFromSessionOrApplication(mockApplication, BUSINESS, BUSINESS_CONTACT_DETAIL, req.session.user),
        ...pageVariables(mockApplication.referenceNumber),
      });
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        res.locals = mockRes().locals;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, () => {
        get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });

  describe('post', () => {
    mapAndSave.contact = jest.fn(() => Promise.resolve(true));

    describe('when there are validation errors', () => {
      it('should render template with validation errors and submitted values', async () => {
        req.body = {};

        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        const validationErrors = generateValidationErrors(payload);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: CONTACT,
            BACK_LINK: req.headers.referer,
          }),
          userName: getUserNameFromSession(req.session.user),
          application: mapApplicationToFormFields(mockApplication),
          ...pageVariables(mockApplication.referenceNumber),
          validationErrors,
          submittedValues: payload,
        });
      });
    });

    describe('when there are no validation errors', () => {
      it('should redirect to next page', async () => {
        req.body = mockContact;

        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${NATURE_OF_BUSINESS_ROOT}`;
        expect(res.redirect).toHaveBeenCalledWith(expected);
      });

      it('should call mapAndSave.contact once with data from constructPayload function', async () => {
        req.body = {
          ...mockContact,
          injection: 1,
        };

        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        expect(mapAndSave.contact).toHaveBeenCalledTimes(1);

        expect(mapAndSave.contact).toHaveBeenCalledWith(payload, mockApplication);
      });

      describe("when the url's last substring is `change`", () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
          req.body = mockContact;

          req.originalUrl = CONTACT_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${CHECK_YOUR_ANSWERS}`;
          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe("when the url's last substring is `check-and-change`", () => {
        it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
          req.body = mockContact;

          req.originalUrl = CONTACT_CHECK_AND_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${CHECK_AND_CHANGE_ROUTE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });
    });

    describe('when application does not exist', () => {
      beforeEach(() => {
        res.locals = mockRes().locals;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
