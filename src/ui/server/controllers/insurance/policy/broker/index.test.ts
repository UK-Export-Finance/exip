import { pageVariables, ERROR_MESSAGE, FIELD_ID, PAGE_CONTENT_STRINGS, TEMPLATE, HTML_FLAGS, get, post } from '.';
import { ERROR_MESSAGES, PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import constructPayload from '../../../../helpers/construct-payload';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';
import mapAndSave from '../map-and-save/broker';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication, mockBroker } from '../../../../test-mocks';

const { USING_BROKER } = POLICY_FIELD_IDS;

const {
  INSURANCE_ROOT,
  POLICY: { BROKER_SAVE_AND_BACK, CHECK_YOUR_ANSWERS, BROKER_DETAILS_ROOT },
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const {
  SHARED_PAGES,
  PARTIALS: {
    INSURANCE: { BROKER: BROKER_PARTIALS },
  },
  ATTRIBUTES: { CLASSES },
} = TEMPLATES;

describe('controllers/insurance/policy/broker', () => {
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
      const result = pageVariables(mockApplication.referenceNumber);

      const expected = {
        FIELD_ID: USING_BROKER,
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${BROKER_SAVE_AND_BACK}`,
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
        LEGEND_CLASS: CLASSES.LEGEND.XL,
      };

      expect(HTML_FLAGS).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render the broker template with correct variables', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...singleInputPageVariables({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK: req.headers.referer, HTML_FLAGS }),
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(mockApplication),
        applicationAnswer: mockApplication.broker[USING_BROKER],
        ...pageVariables(mockApplication.referenceNumber),
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
    mapAndSave.broker = jest.fn(() => Promise.resolve(true));

    describe('when there are validation errors', () => {
      it('should render template with validation errors and submitted values', async () => {
        req.body = {};

        const sanitisedData = sanitiseData(req.body);

        const payload = constructPayload(sanitisedData, [FIELD_ID]);

        await post(req, res);

        const validationErrors = generateValidationErrors(payload, FIELD_ID, ERROR_MESSAGE);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...singleInputPageVariables({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK: req.headers.referer, HTML_FLAGS }),
          userName: getUserNameFromSession(req.session.user),
          ...pageVariables(mockApplication.referenceNumber),
          validationErrors,
          application: mapApplicationToFormFields(mockApplication),
          submittedValues: payload,
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

          const expected = `${INSURANCE_ROOT}/${req.params.referenceNumber}${CHECK_YOUR_ANSWERS}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe('when the answer is true', () => {
        it(`should redirect to ${BROKER_DETAILS_ROOT}`, async () => {
          req.body = {
            [FIELD_ID]: 'true',
          };

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${req.params.referenceNumber}${BROKER_DETAILS_ROOT}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      it('should call mapAndSave.broker once with data from constructPayload function', async () => {
        req.body = {
          ...mockBroker,
          injection: 1,
        };

        await post(req, res);

        const payload = constructPayload(req.body, [FIELD_ID]);

        expect(mapAndSave.broker).toHaveBeenCalledTimes(1);

        expect(mapAndSave.broker).toHaveBeenCalledWith(payload, mockApplication);
      });

      describe("when the url's last substring is `check-and-change`", () => {
        it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
          req.body = mockBroker;

          req.originalUrl = INSURANCE_ROUTES.POLICY.BROKER_CHECK_AND_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${CHECK_AND_CHANGE_ROUTE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        delete res.locals.application;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
