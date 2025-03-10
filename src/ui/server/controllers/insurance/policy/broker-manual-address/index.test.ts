import { pageVariables, FIELD_ID, PAGE_CONTENT_STRINGS, TEMPLATE, get, post } from '.';
import { BUTTONS, PAGES } from '../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/policy';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import generateValidationErrors from './validation';
import mapAndSave from '../map-and-save/broker';
import { Request, ResponseInsurance } from '../../../../../types';
import { mockApplication, mockReq, mockResInsurance, mockSpyPromiseRejection, referenceNumber } from '../../../../test-mocks';

const {
  BROKER_MANUAL_ADDRESS: { FULL_ADDRESS },
} = POLICY_FIELD_IDS;

const {
  PROBLEM_WITH_SERVICE,
  INSURANCE_ROOT,
  POLICY: { LOSS_PAYEE_ROOT, BROKER_MANUAL_ADDRESS_CHANGE, BROKER_MANUAL_ADDRESS_CHECK_AND_CHANGE, BROKER_MANUAL_ADDRESS_SAVE_AND_BACK, CHECK_YOUR_ANSWERS },
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY: CHECK_AND_CHANGE_ROUTE },
} = INSURANCE_ROUTES;

const { broker } = mockApplication;

describe('controllers/insurance/policy/broker-manual-address', () => {
  let req: Request;
  let res: ResponseInsurance;

  beforeEach(() => {
    req = mockReq();
    res = mockResInsurance();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('FIELD_ID', () => {
    it('should have the correct ID', () => {
      const expected = FULL_ADDRESS;

      expect(FIELD_ID).toEqual(expected);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.POLICY.BROKER_MANUAL_ADDRESS);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.POLICY.BROKER_MANUAL_ADDRESS);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(referenceNumber);

      const expected = {
        FIELD: {
          ID: FIELD_ID,
          ...FIELDS.BROKER_MANUAL_ADDRESS[FIELD_ID],
        },
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${BROKER_MANUAL_ADDRESS_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...singleInputPageVariables({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK: req.headers.referer }),
        ...pageVariables(referenceNumber),
        userName: getUserNameFromSession(req.session.user),
        application: mockApplication,
        SUBMIT_BUTTON_COPY: BUTTONS.USE_THIS_ADDRESS,
      });
    });
  });

  describe('post', () => {
    const validBody = {
      [FULL_ADDRESS]: broker[FULL_ADDRESS],
    };

    mapAndSave.broker = jest.fn(() => Promise.resolve(true));

    describe('when there are validation errors', () => {
      it('should render template with validation errors and submitted values', () => {
        req.body = {};

        post(req, res);

        const sanitisedData = sanitiseData(req.body);

        const payload = constructPayload(sanitisedData, [FIELD_ID]);

        const validationErrors = generateValidationErrors(payload);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...singleInputPageVariables({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK: req.headers.referer }),
          ...pageVariables(referenceNumber),
          userName: getUserNameFromSession(req.session.user),
          submittedValues: payload,
          validationErrors,
          SUBMIT_BUTTON_COPY: BUTTONS.USE_THIS_ADDRESS,
        });
      });
    });

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;

        post(req, res);
      });

      it('should call mapAndSave.broker once with data from constructPayload function', () => {
        const payload = constructPayload(req.body, [FIELD_ID]);

        expect(mapAndSave.broker).toHaveBeenCalledTimes(1);

        expect(mapAndSave.broker).toHaveBeenCalledWith(payload, mockApplication);
      });

      describe("when the url's last substring is `change`", () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
          req.originalUrl = BROKER_MANUAL_ADDRESS_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe("when the url's last substring is `check-and-change`", () => {
        it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
          req.originalUrl = BROKER_MANUAL_ADDRESS_CHECK_AND_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`;
          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      it(`should redirect to ${LOSS_PAYEE_ROOT}`, () => {
        const expected = `${INSURANCE_ROOT}/${referenceNumber}${LOSS_PAYEE_ROOT}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });
    });

    describe('api error handling', () => {
      describe('mapAndSave.broker call', () => {
        beforeEach(() => {
          req.body = validBody;
        });

        describe('when mapAndSave.broker does not return a true boolean', () => {
          beforeEach(() => {
            const mapAndSaveSpy = jest.fn(() => Promise.resolve(false));

            mapAndSave.broker = mapAndSaveSpy;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });

        describe('when there is an error', () => {
          beforeEach(() => {
            const mapAndSaveSpy = mockSpyPromiseRejection;

            mapAndSave.broker = mapAndSaveSpy;
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
