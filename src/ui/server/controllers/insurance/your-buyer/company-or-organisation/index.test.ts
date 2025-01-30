import { get, post, pageVariables, TEMPLATE, FIELD_IDS } from '.';
import { PAGES } from '../../../../content-strings';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import { ROUTES, TEMPLATES } from '../../../../constants';
import BUYER_FIELD_IDS from '../../../../constants/field-ids/insurance/your-buyer';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import yourBuyerDetailsValidation from './validation';
import constructPayload from '../../../../helpers/construct-payload';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import mapAndSave from '../map-and-save/buyer';
import { Request, ResponseInsurance } from '../../../../../types';
import { mockReq, mockResInsurance, mockApplication, mockBuyer, mockSpyPromiseRejection, referenceNumber } from '../../../../test-mocks';

const { COMPANY_OR_ORGANISATION } = BUYER_FIELD_IDS;

const {
  INSURANCE_ROOT,
  YOUR_BUYER: YOUR_BUYER_ROUTES,
  CHECK_YOUR_ANSWERS: { YOUR_BUYER: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = ROUTES.INSURANCE;

const {
  CONNECTION_WITH_BUYER,
  COMPANY_OR_ORGANISATION_SAVE_AND_BACK,
  CHECK_YOUR_ANSWERS,
  COMPANY_OR_ORGANISATION_CHANGE,
  COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE,
} = YOUR_BUYER_ROUTES;

const { NAME, ADDRESS, COUNTRY, REGISTRATION_NUMBER, WEBSITE } = COMPANY_OR_ORGANISATION;

const { relationship, ...companyOrOrganisationMock } = mockBuyer;

describe('controllers/insurance/your-buyer/company-or-organisation', () => {
  let req: Request;
  let res: ResponseInsurance;

  beforeEach(() => {
    req = mockReq();
    res = mockResInsurance();
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
        },
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_OR_ORGANISATION_SAVE_AND_BACK}`,
      };

      expect(pageVariables(referenceNumber)).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION);
    });
  });

  describe('FIELD_IDS', () => {
    it('should have the correct FIELD_IDS', () => {
      const expected = [NAME, ADDRESS, COUNTRY, REGISTRATION_NUMBER, WEBSITE];

      expect(FIELD_IDS).toEqual(expected);
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
        ...pageVariables(referenceNumber),
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });
  });

  describe('post', () => {
    const validBody = companyOrOrganisationMock;

    beforeEach(() => {
      mapAndSave.yourBuyer = jest.fn(() => Promise.resolve(true));
    });

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

      it('should redirect to the next page', async () => {
        await post(req, res);
        const expected = `${INSURANCE_ROOT}/${referenceNumber}${CONNECTION_WITH_BUYER}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });

      it('should call mapAndSave.yourBuyer once with data from constructPayload function and application', async () => {
        req.body = {
          ...validBody,
          injection: 1,
        };

        await post(req, res);

        expect(mapAndSave.yourBuyer).toHaveBeenCalledTimes(1);

        const payload = constructPayload(req.body, FIELD_IDS);

        expect(mapAndSave.yourBuyer).toHaveBeenCalledWith(payload, mockApplication);
      });

      describe("when the url's last substring is `change`", () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
          req.body = validBody;

          req.originalUrl = COMPANY_OR_ORGANISATION_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe("when the url's last substring is `check-and-change`", () => {
        it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
          req.body = validBody;
          req.originalUrl = COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });
    });

    describe('when there are validation errors', () => {
      it('should render template with validation errors', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        const validationErrors = yourBuyerDetailsValidation(payload);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: PAGES.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION,
            BACK_LINK: req.headers.referer,
          }),
          userName: getUserNameFromSession(req.session.user),
          ...pageVariables(referenceNumber),
          submittedValues: payload,
          validationErrors,
        };
        expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
      });
    });

    describe('api error handling', () => {
      describe('when mapAndSave.yourBuyer returns false', () => {
        beforeEach(() => {
          req.body = validBody;
          mapAndSave.yourBuyer = jest.fn(() => Promise.resolve(false));
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });

      describe('when mapAndSave.yourBuyer fails', () => {
        beforeEach(() => {
          req.body = validBody;
          mapAndSave.yourBuyer = mockSpyPromiseRejection;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });
    });
  });
});
