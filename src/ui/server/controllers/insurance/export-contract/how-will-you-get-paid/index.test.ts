import { pageVariables, FIELD_ID, PAGE_CONTENT_STRINGS, TEMPLATE, get, post } from '.';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import EXPORT_CONTRACT_FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';
import { PAGES } from '../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/export-contract';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import mapAndSave from '../map-and-save/export-contract';
import { Request, Response } from '../../../../../types';
import {
  mockReq,
  mockRes,
  mockApplication,
  mockApplicationTotalContractValueThresholdTrue,
  mockApplicationTotalContractValueThresholdFalse,
  referenceNumber,
} from '../../../../test-mocks';

const {
  INSURANCE_ROOT,
  PROBLEM_WITH_SERVICE,
  EXPORT_CONTRACT: {
    HOW_WILL_YOU_GET_PAID_CHANGE,
    HOW_WILL_YOU_GET_PAID_CHECK_AND_CHANGE,
    HOW_WILL_YOU_GET_PAID_SAVE_AND_BACK,
    PRIVATE_MARKET,
    PRIVATE_MARKET_CHANGE,
    PRIVATE_MARKET_CHECK_AND_CHANGE,
    AGENT,
    CHECK_YOUR_ANSWERS,
  },
  CHECK_YOUR_ANSWERS: { EXPORT_CONTRACT: CHECK_AND_CHANGE_ROUTE },
} = INSURANCE_ROUTES;

const {
  HOW_WILL_YOU_GET_PAID: { PAYMENT_TERMS_DESCRIPTION },
} = EXPORT_CONTRACT_FIELD_IDS;

const {
  INSURANCE: {
    EXPORT_CONTRACT: { HOW_WILL_YOU_GET_PAID },
  },
} = TEMPLATES;

describe('controllers/insurance/export-contract/how-will-you-get-paid', () => {
  let req: Request;
  let res: Response;

  jest.mock('../map-and-save/export-contract');

  mapAndSave.exportContract = jest.fn(() => Promise.resolve(true));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.EXPORT_CONTRACT.HOW_WILL_YOU_GET_PAID);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(referenceNumber);

      const expected = {
        FIELD: {
          ID: FIELD_ID,
          ...FIELDS.HOW_WILL_YOU_GET_PAID[FIELD_ID],
        },
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${HOW_WILL_YOU_GET_PAID_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(HOW_WILL_YOU_GET_PAID);
    });
  });

  describe('FIELD_ID', () => {
    it('should have the correct FIELD_ID', () => {
      expect(FIELD_ID).toEqual(PAYMENT_TERMS_DESCRIPTION);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      const expectedVariables = {
        ...singleInputPageVariables({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK: req.headers.referer }),
        ...pageVariables(referenceNumber),
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(mockApplication),
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
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

  describe('post', () => {
    const validBody = {
      [FIELD_ID]: mockApplication.exportContract.paymentTermsDescription,
    };

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

      it('should call mapAndSave.exportContract with data from constructPayload function and application', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, [FIELD_ID]);

        expect(mapAndSave.exportContract).toHaveBeenCalledTimes(1);

        expect(mapAndSave.exportContract).toHaveBeenCalledWith(payload, res.locals.application);
      });

      describe("when the url's last substring is `change` and application.totalContractValueOverThreshold is true", () => {
        it(`should redirect to ${PRIVATE_MARKET_CHANGE}`, async () => {
          req.originalUrl = HOW_WILL_YOU_GET_PAID_CHANGE;
          res.locals.application = mockApplicationTotalContractValueThresholdTrue;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${PRIVATE_MARKET_CHANGE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe("when the url's last substring is `change` and application.totalContractValueOverThreshold is false", () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
          req.originalUrl = HOW_WILL_YOU_GET_PAID_CHANGE;
          res.locals.application = mockApplicationTotalContractValueThresholdFalse;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe("when the url's last substring is `check-and-change` and application.totalContractValueOverThreshold is true", () => {
        it(`should redirect to ${PRIVATE_MARKET_CHECK_AND_CHANGE}`, async () => {
          req.originalUrl = HOW_WILL_YOU_GET_PAID_CHECK_AND_CHANGE;
          res.locals.application = mockApplicationTotalContractValueThresholdTrue;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${PRIVATE_MARKET_CHECK_AND_CHANGE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe("when the url's last substring is `check-and-change` and application.totalContractValueOverThreshold is false", () => {
        it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
          req.originalUrl = HOW_WILL_YOU_GET_PAID_CHECK_AND_CHANGE;
          res.locals.application = mockApplicationTotalContractValueThresholdFalse;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe('when application.totalContractValueOverThreshold is true', () => {
        it(`should redirect to ${PRIVATE_MARKET}`, async () => {
          res.locals.application = mockApplicationTotalContractValueThresholdTrue;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${PRIVATE_MARKET}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe('when application.totalContractValueOverThreshold is NOT true', () => {
        it(`should redirect to ${AGENT}`, async () => {
          res.locals.application = mockApplicationTotalContractValueThresholdFalse;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${AGENT}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });
    });

    describe('when there are validation errors', () => {
      it('should render template with validation errors', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, [FIELD_ID]);

        const expectedVariables = {
          ...singleInputPageVariables({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK: req.headers.referer }),
          ...pageVariables(referenceNumber),
          userName: getUserNameFromSession(req.session.user),
          application: mapApplicationToFormFields(mockApplication),
          submittedValues: payload,
          validationErrors: generateValidationErrors(payload),
        };

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
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
      describe('mapAndSave.exportContract call', () => {
        beforeEach(() => {
          req.body = validBody;
        });

        describe('when a true boolean is not returned', () => {
          beforeEach(() => {
            const mapAndSaveSpy = jest.fn(() => Promise.resolve(false));

            mapAndSave.exportContract = mapAndSaveSpy;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });

        describe('when there is an error', () => {
          beforeEach(() => {
            const mapAndSaveSpy = jest.fn(() => Promise.reject(new Error('mock')));

            mapAndSave.exportContract = mapAndSaveSpy;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });
      });
    });
  });
});
