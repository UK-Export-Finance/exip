import { PAGES } from '../../../../content-strings';
import { pageVariables, HTML_FLAGS, get, post, TEMPLATE, FIELD_IDS } from '.';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import constructPayload from '../../../../helpers/construct-payload';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import generateValidationErrors from './validation';
import { POLICY_FIELDS } from '../../../../content-strings/fields/insurance/policy';
import mapAndSave from '../map-and-save/broker';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication, mockBroker } from '../../../../test-mocks';

const { BROKER: BROKER_FIELDS } = POLICY_FIELDS;

const { USING_BROKER, LEGEND, NAME, ADDRESS_LINE_1, ADDRESS_LINE_2, COUNTY, TOWN, POSTCODE, EMAIL, DETAILS } = POLICY_FIELD_IDS.BROKER;

const { BROKER } = PAGES.INSURANCE.POLICY;

const {
  INSURANCE_ROOT,
  POLICY: { BROKER_SAVE_AND_BACK, CHECK_YOUR_ANSWERS },
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

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(SHARED_PAGES.SINGLE_RADIO);
    });
  });

  describe('FIELD_IDS', () => {
    it('should have the correct FIELD_IDS', () => {
      const expected = [USING_BROKER, NAME, ADDRESS_LINE_1, ADDRESS_LINE_2, TOWN, COUNTY, POSTCODE, EMAIL];

      expect(FIELD_IDS).toEqual(expected);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(mockApplication.referenceNumber);

      const expected = {
        FIELD_ID: USING_BROKER,
        FIELDS: {
          USING_BROKER: {
            ID: USING_BROKER,
          },
          LEGEND: {
            ID: LEGEND,
            ...BROKER_FIELDS[LEGEND],
          },
          NAME: {
            ID: NAME,
            ...BROKER_FIELDS[NAME],
          },
          ADDRESS_LINE_1: {
            ID: ADDRESS_LINE_1,
            ...BROKER_FIELDS[ADDRESS_LINE_1],
          },
          ADDRESS_LINE_2: {
            ID: ADDRESS_LINE_2,
            ...BROKER_FIELDS[ADDRESS_LINE_2],
          },
          TOWN: {
            ID: TOWN,
            ...BROKER_FIELDS[TOWN],
          },
          COUNTY: {
            ID: COUNTY,
            ...BROKER_FIELDS[COUNTY],
          },
          POSTCODE: {
            ID: POSTCODE,
            ...BROKER_FIELDS[POSTCODE],
          },
          EMAIL: {
            ID: EMAIL,
            ...BROKER_FIELDS[EMAIL],
          },
          DETAILS: {
            ID: DETAILS,
            ...BROKER_FIELDS[DETAILS],
          },
        },
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${BROKER_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('HTML_FLAGS', () => {
    it('should have correct properties', () => {
      const expected = {
        CONDITIONAL_YES_HTML: BROKER_PARTIALS.CONDITIONAL_YES_HTML,
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
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: BROKER,
          BACK_LINK: req.headers.referer,
          HTML_FLAGS,
        }),
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

        const payload = constructPayload(sanitisedData, FIELD_IDS);

        await post(req, res);

        const validationErrors = generateValidationErrors(payload);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: BROKER,
            BACK_LINK: req.headers.referer,
            HTML_FLAGS,
          }),
          userName: getUserNameFromSession(req.session.user),
          ...pageVariables(mockApplication.referenceNumber),
          validationErrors,
          application: mapApplicationToFormFields(mockApplication),
          submittedValues: payload,
        });
      });
    });

    describe('when there are no validation errors', () => {
      it('should redirect to next page', async () => {
        req.body = mockBroker;

        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${CHECK_YOUR_ANSWERS}`;
        expect(res.redirect).toHaveBeenCalledWith(expected);
      });

      it('should call mapAndSave.broker once with data from constructPayload function', async () => {
        req.body = {
          ...mockBroker,
          injection: 1,
        };

        await post(req, res);

        const sanitisedData = sanitiseData(req.body);

        const payload = constructPayload(sanitisedData, FIELD_IDS);

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
