import { pageVariables, HTML_FLAGS, FIELD_IDS, PAGE_CONTENT_STRINGS, TEMPLATE, get, post } from '.';
import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { POLICY_FIELDS } from '../../../../content-strings/fields/insurance/policy';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import constructPayload from '../../../../helpers/construct-payload';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import generateValidationErrors from './validation';
import mapAndSave from '../map-and-save/broker';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication, referenceNumber, mockSpyPromiseRejection } from '../../../../test-mocks';

const { NAME, EMAIL, IS_BASED_IN_UK, POSTCODE, BUILDING_NUMBER_OR_NAME } = POLICY_FIELD_IDS.BROKER_DETAILS;

const {
  INSURANCE_ROOT,
  POLICY: { BROKER_DETAILS_SAVE_AND_BACK, BROKER_CONFIRM_ADDRESS_ROOT, BROKER_DETAILS_CHANGE, BROKER_DETAILS_CHECK_AND_CHANGE, CHECK_YOUR_ANSWERS },
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const { BROKER_DETAILS } = POLICY_FIELDS;

const { broker } = mockApplication;

describe('controllers/insurance/policy/broker-details', () => {
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
      const expected = [NAME, EMAIL, IS_BASED_IN_UK, POSTCODE, BUILDING_NUMBER_OR_NAME];

      expect(FIELD_IDS).toEqual(expected);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.POLICY.BROKER_DETAILS);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.POLICY.BROKER_DETAILS);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(referenceNumber);

      const expected = {
        FIELDS: {
          NAME: {
            ID: NAME,
            ...BROKER_DETAILS[NAME],
          },
          EMAIL: {
            ID: EMAIL,
            ...BROKER_DETAILS[EMAIL],
          },
          IS_BASED_IN_UK: {
            ID: IS_BASED_IN_UK,
            ...BROKER_DETAILS[IS_BASED_IN_UK],
          },
          POSTCODE: {
            ID: POSTCODE,
            ...BROKER_DETAILS[POSTCODE],
          },
          BUILDING_NUMBER_OR_NAME: {
            ID: BUILDING_NUMBER_OR_NAME,
            ...BROKER_DETAILS[BUILDING_NUMBER_OR_NAME],
          },
        },
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${BROKER_DETAILS_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('HTML_FLAGS', () => {
    it('should have correct properties', () => {
      const expected = {
        HORIZONTAL_RADIOS: true,
        NO_RADIO_AS_FIRST_OPTION: true,
      };

      expect(HTML_FLAGS).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
          HTML_FLAGS,
        }),
        ...pageVariables(referenceNumber),
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(mockApplication),
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
      [NAME]: broker[NAME],
      [EMAIL]: broker[EMAIL],
      [IS_BASED_IN_UK]: 'true',
      [POSTCODE]: broker[POSTCODE],
      [BUILDING_NUMBER_OR_NAME]: broker[BUILDING_NUMBER_OR_NAME],
    };

    mapAndSave.broker = jest.fn(() => Promise.resolve(true));

    describe('when there are validation errors', () => {
      it('should render template with validation errors and submitted values', async () => {
        req.body = {};

        await post(req, res);

        const sanitisedData = sanitiseData(req.body);

        const payload = constructPayload(sanitisedData, FIELD_IDS);

        const validationErrors = generateValidationErrors(payload);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS,
            BACK_LINK: req.headers.referer,
            HTML_FLAGS,
          }),
          ...pageVariables(referenceNumber),
          userName: getUserNameFromSession(req.session.user),
          application: mapApplicationToFormFields(mockApplication),
          submittedValues: payload,
          validationErrors,
        });
      });
    });

    describe('when there are no validation errors', () => {
      beforeEach(async () => {
        req.body = validBody;

        await post(req, res);
      });

      it('should call mapAndSave.broker once with data from constructPayload function', () => {
        const payload = constructPayload(req.body, FIELD_IDS);

        expect(mapAndSave.broker).toHaveBeenCalledTimes(1);

        expect(mapAndSave.broker).toHaveBeenCalledWith(payload, mockApplication);
      });

      it(`should redirect to ${BROKER_CONFIRM_ADDRESS_ROOT}`, () => {
        const expected = `${INSURANCE_ROOT}/${referenceNumber}${BROKER_CONFIRM_ADDRESS_ROOT}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });

      describe("when the url's last substring is `change`", () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
          req.originalUrl = BROKER_DETAILS_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe("when the url's last substring is `check-and-change`", () => {
        it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
          req.originalUrl = BROKER_DETAILS_CHECK_AND_CHANGE;

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
