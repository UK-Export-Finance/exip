import { PAGE_CONTENT_STRINGS, pageVariables, HTML_FLAGS, TEMPLATE, FIELD_IDS, get, post } from '.';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { PAGES, CREDIT_PERIOD_WITH_BUYER as CREDIT_PERIOD_WITH_BUYER_STRINGS } from '../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import constructPayload from '../../../../helpers/construct-payload';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import generateValidationErrors from './validation';
import mapAndSave from '../map-and-save/policy';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication, referenceNumber } from '../../../../test-mocks';

const {
  INSURANCE_ROOT,
  POLICY: { ANOTHER_COMPANY, PRE_CREDIT_PERIOD_SAVE_AND_BACK, PRE_CREDIT_PERIOD_CHANGE, PRE_CREDIT_PERIOD_CHECK_AND_CHANGE, CHECK_YOUR_ANSWERS },
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const { NEED_PRE_CREDIT_PERIOD, CREDIT_PERIOD_WITH_BUYER } = POLICY_FIELD_IDS;

const {
  SHARED_PAGES,
  PARTIALS: {
    INSURANCE: { POLICY },
  },
} = TEMPLATES;

describe('controllers/insurance/policy/pre-credit-period', () => {
  let req: Request;
  let res: Response;

  jest.mock('../map-and-save/policy');

  mapAndSave.policy = jest.fn(() => Promise.resolve(true));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct properties', () => {
      const expected = {
        ...PAGES.INSURANCE.POLICY.PRE_CREDIT_PERIOD,
        HINT: FIELDS[NEED_PRE_CREDIT_PERIOD].HINT,
        CREDIT_PERIOD_WITH_BUYER: CREDIT_PERIOD_WITH_BUYER_STRINGS,
      };

      expect(PAGE_CONTENT_STRINGS).toEqual(expected);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(referenceNumber);

      const expected = {
        FIELD_ID: NEED_PRE_CREDIT_PERIOD,
        FIELD_HINT: PAGE_CONTENT_STRINGS.HINT,
        FIELDS: {
          NEED_PRE_CREDIT_PERIOD: {
            ID: NEED_PRE_CREDIT_PERIOD,
            ...FIELDS[NEED_PRE_CREDIT_PERIOD],
          },
          CREDIT_PERIOD_WITH_BUYER: {
            ID: CREDIT_PERIOD_WITH_BUYER,
            ...FIELDS[CREDIT_PERIOD_WITH_BUYER],
          },
        },
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${PRE_CREDIT_PERIOD_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('HTML_FLAGS', () => {
    it('should have the correct properties', () => {
      const expected = {
        HORIZONTAL_RADIOS: true,
        NO_RADIO_AS_FIRST_OPTION: true,
        CONDITIONAL_YES_HTML: POLICY.PRE_CREDIT_PERIOD.CUSTOM_CONTENT_HTML,
        CUSTOM_CONTENT_HTML: POLICY.CREDIT_PERIOD_WITH_BUYER.CUSTOM_CONTENT_HTML,
      };

      expect(HTML_FLAGS).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(SHARED_PAGES.SINGLE_RADIO);
    });
  });

  describe('FIELD_IDS', () => {
    it('should have the correct FIELD_IDS', () => {
      const expected = [NEED_PRE_CREDIT_PERIOD, CREDIT_PERIOD_WITH_BUYER];

      expect(FIELD_IDS).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
          HTML_FLAGS,
        }),
        ...pageVariables(referenceNumber),
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(mockApplication),
        applicationAnswer: mockApplication.policy[NEED_PRE_CREDIT_PERIOD],
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
      [NEED_PRE_CREDIT_PERIOD]: 'true',
      [CREDIT_PERIOD_WITH_BUYER]: 'Mock description',
    };

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

      it('should call mapAndSave.policy with data from constructPayload function and application', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        expect(mapAndSave.policy).toHaveBeenCalledTimes(1);

        expect(mapAndSave.policy).toHaveBeenCalledWith(payload, res.locals.application);
      });

      it(`should redirect to ${ANOTHER_COMPANY}`, async () => {
        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${req.params.referenceNumber}${ANOTHER_COMPANY}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });

      describe("when the url's last substring is `change`", () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
          req.originalUrl = PRE_CREDIT_PERIOD_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe("when the url's last substring is `check-and-change`", () => {
        it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
          req.originalUrl = PRE_CREDIT_PERIOD_CHECK_AND_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });
    });

    describe('when there are validation errors', () => {
      const mockInvalidBody = {
        [NEED_PRE_CREDIT_PERIOD]: '',
        [CREDIT_PERIOD_WITH_BUYER]: '',
      };

      beforeEach(() => {
        req.body = mockInvalidBody;
      });

      it('should render template with validation errors', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);
        const sanitisedData = sanitiseData(payload);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS,
            BACK_LINK: req.headers.referer,
            HTML_FLAGS,
          }),
          ...pageVariables(referenceNumber),
          userName: getUserNameFromSession(req.session.user),
          application: res.locals.application,
          submittedValues: sanitisedData,
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
      describe('mapAndSave.policy call', () => {
        beforeEach(() => {
          req.body = validBody;
        });

        describe('when a true boolean is not returned', () => {
          beforeEach(() => {
            const mapAndSaveSpy = jest.fn(() => Promise.resolve(false));

            mapAndSave.policy = mapAndSaveSpy;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });

        describe('when there is an error', () => {
          beforeEach(() => {
            const mapAndSaveSpy = jest.fn(() => Promise.reject(new Error('mock')));

            mapAndSave.policy = mapAndSaveSpy;
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
