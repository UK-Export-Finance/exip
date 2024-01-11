import { PAGE_CONTENT_STRINGS, pageVariables, HTML_FLAGS, TEMPLATE, FIELD_IDS, get, post } from '.';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { PAGES, PRE_CREDIT_PERIOD_DESCRIPTION as PRE_CREDIT_PERIOD_DESCRIPTION_STRINGS } from '../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import generateValidationErrors from './validation';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication } from '../../../../test-mocks';

const {
  INSURANCE_ROOT,
  POLICY: { PRE_CREDIT_PERIOD_SAVE_AND_BACK, BROKER_ROOT },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const { NEED_PRE_CREDIT_PERIOD, PRE_CREDIT_PERIOD_DESCRIPTION } = POLICY_FIELD_IDS;

const {
  SHARED_PAGES,
  PARTIALS: {
    INSURANCE: { POLICY },
  },
} = TEMPLATES;

describe('controllers/insurance/policy/pre-credit-period', () => {
  let req: Request;
  let res: Response;
  let refNumber: number;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplication;

    req.params.referenceNumber = String(mockApplication.referenceNumber);
    refNumber = Number(mockApplication.referenceNumber);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct properties', () => {
      const expected = {
        ...PAGES.INSURANCE.POLICY.PRE_CREDIT_PERIOD,
        HINT: FIELDS[NEED_PRE_CREDIT_PERIOD].HINT,
        PRE_CREDIT_PERIOD_DESCRIPTION: PRE_CREDIT_PERIOD_DESCRIPTION_STRINGS,
      };

      expect(PAGE_CONTENT_STRINGS).toEqual(expected);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(refNumber);

      const expected = {
        FIELD_ID: NEED_PRE_CREDIT_PERIOD,
        FIELD_HINT: PAGE_CONTENT_STRINGS.HINT,
        FIELDS: {
          NEED_PRE_CREDIT_PERIOD: {
            ID: NEED_PRE_CREDIT_PERIOD,
            ...FIELDS[NEED_PRE_CREDIT_PERIOD],
          },
          PRE_CREDIT_PERIOD_DESCRIPTION: {
            ID: PRE_CREDIT_PERIOD_DESCRIPTION,
            ...FIELDS[PRE_CREDIT_PERIOD_DESCRIPTION],
          },
        },
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${req.params.referenceNumber}${PRE_CREDIT_PERIOD_SAVE_AND_BACK}`,
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
        CUSTOM_CONTENT_HTML: POLICY.PRE_CREDIT_PERIOD_DESCRIPTION.CUSTOM_CONTENT_HTML,
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
      const expected = [NEED_PRE_CREDIT_PERIOD, PRE_CREDIT_PERIOD_DESCRIPTION];

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
        ...pageVariables(refNumber),
        userName: getUserNameFromSession(req.session.user),
        application: res.locals.application,
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
    describe('when there are no validation errors', () => {
      const validBody = {
        [NEED_PRE_CREDIT_PERIOD]: 'true',
        [PRE_CREDIT_PERIOD_DESCRIPTION]: 'mock description',
      };

      beforeEach(() => {
        req.body = validBody;
      });

      it(`should redirect to ${BROKER_ROOT}`, () => {
        post(req, res);

        const expected = `${INSURANCE_ROOT}/${req.params.referenceNumber}${BROKER_ROOT}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });
    });

    describe('when there are validation errors', () => {
      const mockInvalidBody = {
        [NEED_PRE_CREDIT_PERIOD]: '',
        [PRE_CREDIT_PERIOD_DESCRIPTION]: '',
      };

      beforeEach(() => {
        req.body = mockInvalidBody;
      });

      it('should render template with validation errors', () => {
        post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);
        const sanitisedData = sanitiseData(payload);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS,
            BACK_LINK: req.headers.referer,
            HTML_FLAGS,
          }),
          ...pageVariables(refNumber),
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
  });
});
