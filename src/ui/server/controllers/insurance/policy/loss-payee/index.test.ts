import { FIELD_ID, ERROR_MESSAGE, PAGE_CONTENT_STRINGS, TEMPLATE, HTML_FLAGS, pageVariables, get, post } from '.';
import { ERROR_MESSAGES, PAGES } from '../../../../content-strings';
import { POLICY_FIELDS } from '../../../../content-strings/fields/insurance/policy';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';
import mapAndSave from '../map-and-save/loss-payee';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication, referenceNumber } from '../../../../test-mocks';

const {
  LOSS_PAYEE: { IS_APPOINTED },
} = POLICY_FIELD_IDS;

const {
  INSURANCE_ROOT,
  POLICY: { LOSS_PAYEE_DETAILS_ROOT, LOSS_PAYEE_SAVE_AND_BACK, CHECK_YOUR_ANSWERS },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

describe('controllers/insurance/policy/loss-payee', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('FIELD_ID', () => {
    it('should have the correct ID', () => {
      const expected = IS_APPOINTED;

      expect(FIELD_ID).toEqual(expected);
    });
  });

  describe('ERROR_MESSAGE', () => {
    it('should have the correct error message', () => {
      const expected = ERROR_MESSAGES.INSURANCE.POLICY[FIELD_ID].IS_EMPTY;

      expect(ERROR_MESSAGE).toEqual(expected);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.POLICY.LOSS_PAYEE);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.SHARED_PAGES.SINGLE_RADIO);
    });
  });

  describe('HTML_FLAGS', () => {
    it('should have correct properties', () => {
      const expected = {
        HINT_HTML: TEMPLATES.PARTIALS.INSURANCE.POLICY.LOSS_PAYEE.HINT_HTML,
        HORIZONTAL_RADIOS: true,
        NO_RADIO_AS_FIRST_OPTION: true,
      };

      expect(HTML_FLAGS).toEqual(expected);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELD_ID,
        PAGE_CONTENT_STRINGS,
        FIELD_HINT: POLICY_FIELDS.LOSS_PAYEE[FIELD_ID].HINT,
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${LOSS_PAYEE_SAVE_AND_BACK}`,
      };

      expect(pageVariables(referenceNumber)).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...singleInputPageVariables({
          FIELD_ID,
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
          HTML_FLAGS,
        }),
        ...pageVariables(referenceNumber),
        userName: getUserNameFromSession(req.session.user),
        applicationAnswer: mockApplication.nominatedLossPayee[IS_APPOINTED],
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
    const validBody = {
      [FIELD_ID]: 'true',
    };

    mapAndSave.lossPayee = jest.fn(() => Promise.resolve(true));

    describe('when there are validation errors', () => {
      it('should render template with validation errors and submitted values', async () => {
        req.body = {};

        await post(req, res);

        const payload = constructPayload(req.body, [FIELD_ID]);

        const validationErrors = generateValidationErrors(payload, FIELD_ID, ERROR_MESSAGE);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...singleInputPageVariables({
            FIELD_ID,
            PAGE_CONTENT_STRINGS,
            BACK_LINK: req.headers.referer,
            HTML_FLAGS,
          }),
          ...pageVariables(referenceNumber),
          userName: getUserNameFromSession(req.session.user),
          submittedValues: payload,
          validationErrors,
        });
      });
    });

    describe('when there are no validation errors', () => {
      describe('when the answer is false', () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
          req.body = {
            [FIELD_ID]: 'false',
          };

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe('when the answer is true', () => {
        it(`should redirect to ${LOSS_PAYEE_DETAILS_ROOT}`, async () => {
          req.body = {
            [FIELD_ID]: 'true',
          };

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${LOSS_PAYEE_DETAILS_ROOT}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      it('should call mapAndSave.lossPayee once with data from constructPayload function', async () => {
        req.body = validBody;

        await post(req, res);

        const payload = constructPayload(req.body, [FIELD_ID]);

        expect(mapAndSave.lossPayee).toHaveBeenCalledTimes(1);

        expect(mapAndSave.lossPayee).toHaveBeenCalledWith(payload, mockApplication);
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
      describe('mapAndSave.lossPayee call', () => {
        beforeEach(() => {
          req.body = validBody;
        });

        describe('when a true boolean is not returned', () => {
          beforeEach(() => {
            const mapAndSaveSpy = jest.fn(() => Promise.resolve(false));

            mapAndSave.lossPayee = mapAndSaveSpy;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });

        describe('when there is an error', () => {
          beforeEach(() => {
            const mapAndSaveSpy = jest.fn(() => Promise.reject(new Error('mock')));

            mapAndSave.lossPayee = mapAndSaveSpy;
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
