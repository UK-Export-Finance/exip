import { pageVariables, HTML_FLAGS, TEMPLATE, PAGE_CONTENT_STRINGS, get } from '.';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { PAGES, PRE_CREDIT_PERIOD_DESCRIPTION } from '../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication } from '../../../../test-mocks';

const {
  INSURANCE_ROOT,
  POLICY: { PRE_CREDIT_PERIOD_SAVE_AND_BACK },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const { NEED_PRE_CREDIT_PERIOD } = POLICY_FIELD_IDS;

const {
  SHARED_PAGES,
  PARTIALS: {
    INSURANCE: {
      POLICY: { PRE_CREDIT_PERIOD },
    },
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

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(refNumber);

      const expected = {
        FIELDS: {
          NEED_PRE_CREDIT_PERIOD: {
            ID: NEED_PRE_CREDIT_PERIOD,
            ...FIELDS[NEED_PRE_CREDIT_PERIOD],
          },
        },
        PAGE_CONTENT_STRINGS: {
          ...PAGES.INSURANCE.POLICY.PRE_CREDIT_PERIOD,
          PRE_CREDIT_PERIOD_DESCRIPTION,
        },
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${req.params.referenceNumber}${PRE_CREDIT_PERIOD_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('HTML_FLAGS', () => {
    it('should have the correct properties', () => {
      const expected = {
        CUSTOM_CONTENT_HTML: PRE_CREDIT_PERIOD.CUSTOM_CONTENT_HTML,
      };

      expect(HTML_FLAGS).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(SHARED_PAGES.SINGLE_RADIO);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct properties', () => {
      const expected = {
        ...PAGES.INSURANCE.POLICY.PRE_CREDIT_PERIOD,
        PRE_CREDIT_PERIOD_DESCRIPTION,
      };

      expect(PAGE_CONTENT_STRINGS).toEqual(expected);
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
        application: mapApplicationToFormFields(mockApplication),
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
});
