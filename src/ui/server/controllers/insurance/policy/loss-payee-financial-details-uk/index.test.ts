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
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import mapAndSave from '../map-and-save/loss-payee-financial-details-uk';
import { Application, Request, ResponseInsurance } from '../../../../../types';
import { mockReq, mockResInsurance, mockLossPayeeFinancialDetailsUk, mockApplication, referenceNumber } from '../../../../test-mocks';

const { SORT_CODE, ACCOUNT_NUMBER } = POLICY_FIELD_IDS.LOSS_PAYEE_FINANCIAL_UK;
const { FINANCIAL_ADDRESS } = POLICY_FIELD_IDS;

const {
  INSURANCE_ROOT,
  POLICY: { CHECK_YOUR_ANSWERS, LOSS_PAYEE_FINANCIAL_DETAILS_UK_SAVE_AND_BACK, LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHECK_AND_CHANGE },
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY: CHECK_AND_CHANGE_ROUTE },
} = INSURANCE_ROUTES;

const { LOSS_PAYEE_FINANCIAL_UK, FINANCIAL_ADDRESS: FINANCIAL_ADDRESS_FIELD } = POLICY_FIELDS;

describe('controllers/insurance/policy/loss-payee-financial-details-uk', () => {
  let req: Request;
  let res: ResponseInsurance;

  beforeEach(() => {
    req = mockReq();
    res = mockResInsurance();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('FIELD_IDS', () => {
    it('should have the correct FIELD_IDS', () => {
      const expected = [SORT_CODE, ACCOUNT_NUMBER, FINANCIAL_ADDRESS];

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
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.POLICY.LOSS_PAYEE_FINANCIAL_UK);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(referenceNumber);

      const expected = {
        FIELDS: {
          SORT_CODE: {
            ID: SORT_CODE,
            ...LOSS_PAYEE_FINANCIAL_UK[SORT_CODE],
          },
          ACCOUNT_NUMBER: {
            ID: ACCOUNT_NUMBER,
            ...LOSS_PAYEE_FINANCIAL_UK[ACCOUNT_NUMBER],
          },
          FINANCIAL_ADDRESS: {
            ID: FINANCIAL_ADDRESS,
            ...FINANCIAL_ADDRESS_FIELD,
          },
        },
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${LOSS_PAYEE_FINANCIAL_DETAILS_UK_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      const mappedApplication = mapApplicationToFormFields(mockApplication) as Application;

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(referenceNumber),
        userName: getUserNameFromSession(req.session.user),
        submittedValues: mappedApplication.nominatedLossPayee.financialUk,
      });
    });
  });

  describe('post', () => {
    const validBody = mockLossPayeeFinancialDetailsUk;

    beforeEach(() => {
      mapAndSave.lossPayeeFinancialDetailsUk = jest.fn(() => Promise.resolve(true));
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

      it('should call mapAndSave.lossPayeeFinancialDetailsUk once with data from constructPayload function', async () => {
        req.body = validBody;

        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        expect(mapAndSave.lossPayeeFinancialDetailsUk).toHaveBeenCalledTimes(1);

        expect(mapAndSave.lossPayeeFinancialDetailsUk).toHaveBeenCalledWith(payload, mockApplication);
      });

      describe("when the url's last substring is `check-and-change`", () => {
        it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
          req.originalUrl = LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHECK_AND_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });
    });
  });
});
