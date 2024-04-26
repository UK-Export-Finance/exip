import { FIELD_IDS, PAGE_CONTENT_STRINGS, TEMPLATE, pageVariables, get, post } from '.';
import { PAGES } from '../../../../content-strings';
import { POLICY_FIELDS } from '../../../../content-strings/fields/insurance/policy';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import mapAndSave from '../map-and-save/loss-payee-financial-details-international';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockLossPayeeFinancialDetailsInternational, referenceNumber, mockApplication } from '../../../../test-mocks';

const { BIC_SWIFT_CODE, IBAN } = POLICY_FIELD_IDS.LOSS_PAYEE_FINANCIAL_INTERNATIONAL;
const { FINANCIAL_ADDRESS } = POLICY_FIELD_IDS;

const {
  INSURANCE_ROOT,
  PROBLEM_WITH_SERVICE,
  POLICY: { CHECK_YOUR_ANSWERS, LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHECK_AND_CHANGE },
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY: CHECK_AND_CHANGE_ROUTE },
} = INSURANCE_ROUTES;

const { LOSS_PAYEE_FINANCIAL_INTERNATIONAL, FINANCIAL_ADDRESS: FINANCIAL_ADDRESS_FIELD } = POLICY_FIELDS;

describe('controllers/insurance/policy/loss-payee-financial-details-international', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('FIELD_IDS', () => {
    it('should have the correct FIELD_IDS', () => {
      const expected = [BIC_SWIFT_CODE, IBAN, FINANCIAL_ADDRESS];

      expect(FIELD_IDS).toEqual(expected);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.POLICY.LOSS_PAYEE_FINANCIAL_DETAILS);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.POLICY.LOSS_PAYEE_FINANCIAL_INTERNATIONAL);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(referenceNumber);

      const expected = {
        FIELDS: {
          BIC_SWIFT_CODE: {
            ID: BIC_SWIFT_CODE,
            ...LOSS_PAYEE_FINANCIAL_INTERNATIONAL[BIC_SWIFT_CODE],
          },
          IBAN: {
            ID: IBAN,
            ...LOSS_PAYEE_FINANCIAL_INTERNATIONAL[IBAN],
          },
          FINANCIAL_ADDRESS: {
            ID: FINANCIAL_ADDRESS,
            ...FINANCIAL_ADDRESS_FIELD,
          },
        },
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}#`,
      };

      expect(result).toEqual(expected);
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
        ...pageVariables(referenceNumber),
        userName: getUserNameFromSession(req.session.user),
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

  describe('post', () => {
    const validBody = mockLossPayeeFinancialDetailsInternational;

    beforeEach(() => {
      mapAndSave.lossPayeeFinancialDetailsInternational = jest.fn(() => Promise.resolve(true));
    });

    describe('when there are validation errors', () => {
      it('should render template with validation errors', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(referenceNumber),
          userName: getUserNameFromSession(req.session.user),
          submittedValues: payload,
          validationErrors: generateValidationErrors(payload),
        };

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
      });
    });

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });

      it('should call mapAndSave.lossPayeeFinancialDetailsInternational once with data from constructPayload function', async () => {
        req.body = validBody;

        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        expect(mapAndSave.lossPayeeFinancialDetailsInternational).toHaveBeenCalledTimes(1);

        expect(mapAndSave.lossPayeeFinancialDetailsInternational).toHaveBeenCalledWith(payload, mockApplication);
      });

      describe("when the url's last substring is `check-and-change`", () => {
        it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
          req.originalUrl = LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHECK_AND_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`;

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

    describe('when mapAndSave.lossPayeeFinancialDetailsInternational does not return a true boolean', () => {
      beforeEach(() => {
        req.body = validBody;
        const mapAndSaveSpy = jest.fn(() => Promise.resolve(false));

        mapAndSave.lossPayeeFinancialDetailsInternational = mapAndSaveSpy;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when mapAndSave.exportContractAgentServiceCharge returns an error', () => {
      beforeEach(() => {
        req.body = validBody;
        const mapAndSaveSpy = jest.fn(() => Promise.reject(new Error('mock')));

        mapAndSave.lossPayeeFinancialDetailsInternational = mapAndSaveSpy;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
