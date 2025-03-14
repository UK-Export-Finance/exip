import { pageVariables, ERROR_MESSAGE, FIELD_ID, PAGE_CONTENT_STRINGS, TEMPLATE, HTML_FLAGS, get, post } from '.';
import { ERROR_MESSAGES, PAGES } from '../../../../content-strings';
import { ATTRIBUTES, TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import constructPayload from '../../../../helpers/construct-payload';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';
import mapAndSave from '../map-and-save/broker';
import { Request, ResponseInsurance } from '../../../../../types';
import { mockReq, mockResInsurance, mockApplication, mockSpyPromiseRejection, referenceNumber } from '../../../../test-mocks';

const { USING_BROKER } = POLICY_FIELD_IDS;

const {
  INSURANCE_ROOT,
  POLICY: {
    BROKER_SAVE_AND_BACK,
    LOSS_PAYEE_ROOT,
    BROKER_CHECK_AND_CHANGE,
    BROKER_DETAILS_ROOT,
    BROKER_DETAILS_CHANGE,
    BROKER_DETAILS_CHECK_AND_CHANGE,
    CHECK_YOUR_ANSWERS,
  },
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const {
  SHARED_PAGES,
  PARTIALS: {
    INSURANCE: { BROKER: BROKER_PARTIALS },
  },
} = TEMPLATES;

describe('controllers/insurance/policy/broker', () => {
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
      const expected = USING_BROKER;

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
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.POLICY.BROKER);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(SHARED_PAGES.SINGLE_RADIO);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(referenceNumber);

      const expected = {
        FIELD_ID: USING_BROKER,
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${BROKER_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('HTML_FLAGS', () => {
    it('should have correct properties', () => {
      const expected = {
        HORIZONTAL_RADIOS: true,
        NO_RADIO_AS_FIRST_OPTION: true,
        CUSTOM_CONTENT_HTML: BROKER_PARTIALS.CUSTOM_CONTENT_HTML,
        LEGEND_CLASS: ATTRIBUTES.CLASSES.LEGEND.XL,
      };

      expect(HTML_FLAGS).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...singleInputPageVariables({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK: req.headers.referer, HTML_FLAGS }),
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(mockApplication),
        applicationAnswer: mockApplication.broker[USING_BROKER],
        ...pageVariables(referenceNumber),
      });
    });
  });

  describe('post', () => {
    const bodyAnswerTrue = {
      [FIELD_ID]: 'true',
    };

    const bodyAnswerFalse = {
      [FIELD_ID]: 'false',
    };

    mapAndSave.broker = jest.fn(() => Promise.resolve(true));

    describe('when there are validation errors', () => {
      it('should render template with validation errors and submitted values', async () => {
        req.body = {};

        await post(req, res);

        const sanitisedData = sanitiseData(req.body);

        const payload = constructPayload(sanitisedData, [FIELD_ID]);

        const validationErrors = generateValidationErrors(payload, FIELD_ID, ERROR_MESSAGE);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...singleInputPageVariables({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK: req.headers.referer, HTML_FLAGS }),
          userName: getUserNameFromSession(req.session.user),
          ...pageVariables(referenceNumber),
          application: mapApplicationToFormFields(mockApplication),
          submittedValues: payload,
          validationErrors,
        });
      });
    });

    describe('when there are no validation errors', () => {
      describe('when the answer is false', () => {
        it(`should redirect to ${LOSS_PAYEE_ROOT}`, async () => {
          req.body = bodyAnswerFalse;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${LOSS_PAYEE_ROOT}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe('when the answer is true', () => {
        it(`should redirect to ${BROKER_DETAILS_ROOT}`, async () => {
          req.body = bodyAnswerTrue;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${BROKER_DETAILS_ROOT}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      it('should call mapAndSave.broker once with data from constructPayload function', async () => {
        req.body = bodyAnswerFalse;

        await post(req, res);

        const payload = constructPayload(req.body, [FIELD_ID]);

        expect(mapAndSave.broker).toHaveBeenCalledTimes(1);

        expect(mapAndSave.broker).toHaveBeenCalledWith(payload, mockApplication);
      });

      describe("when the url's last substring is `change`", () => {
        describe(`when ${USING_BROKER} is true`, () => {
          it(`should redirect to ${BROKER_DETAILS_CHANGE}`, async () => {
            req.originalUrl = BROKER_DETAILS_CHANGE;
            req.body = bodyAnswerTrue;

            await post(req, res);

            const expected = `${INSURANCE_ROOT}/${referenceNumber}${BROKER_DETAILS_CHANGE}`;

            expect(res.redirect).toHaveBeenCalledWith(expected);
          });
        });

        describe(`when ${USING_BROKER} is false`, () => {
          it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
            req.originalUrl = BROKER_DETAILS_CHANGE;
            req.body = bodyAnswerFalse;

            await post(req, res);

            const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

            expect(res.redirect).toHaveBeenCalledWith(expected);
          });
        });
      });

      describe("when the url's last substring is `check-and-change`", () => {
        describe(`when ${USING_BROKER} is true`, () => {
          it(`should redirect to ${BROKER_DETAILS_CHECK_AND_CHANGE}`, async () => {
            req.body = bodyAnswerTrue;
            req.originalUrl = BROKER_CHECK_AND_CHANGE;

            await post(req, res);

            const expected = `${INSURANCE_ROOT}/${referenceNumber}${BROKER_DETAILS_CHECK_AND_CHANGE}`;

            expect(res.redirect).toHaveBeenCalledWith(expected);
          });
        });

        describe(`when ${USING_BROKER} is false`, () => {
          it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
            req.originalUrl = INSURANCE_ROUTES.POLICY.BROKER_CHECK_AND_CHANGE;
            req.body = bodyAnswerFalse;

            await post(req, res);

            const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`;

            expect(res.redirect).toHaveBeenCalledWith(expected);
          });
        });
      });
    });

    describe('api error handling', () => {
      describe('mapAndSave.broker call', () => {
        beforeEach(() => {
          req.body = bodyAnswerFalse;
        });

        describe('when a true boolean is not returned', () => {
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
