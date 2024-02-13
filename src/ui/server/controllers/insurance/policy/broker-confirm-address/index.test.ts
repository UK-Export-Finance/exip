import { pageVariables, PAGE_CONTENT_STRINGS, TEMPLATE, get, post } from '.';
import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication } from '../../../../test-mocks';

const {
  BROKER_DETAILS: { FULL_ADDRESS },
} = POLICY_FIELD_IDS;

const {
  INSURANCE_ROOT,
  ALL_SECTIONS,
  POLICY: { BROKER_DETAILS_ROOT, CHECK_YOUR_ANSWERS },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

describe('controllers/insurance/policy/broker-confirm-address', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.POLICY.BROKER_CONFIRM_ADDRESS);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.POLICY.BROKER_CONFIRM_ADDRESS);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(mockApplication.referenceNumber);

      const expected = {
        USE_DIFFERENT_ADDRESS_URL: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${BROKER_DETAILS_ROOT}`,
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${ALL_SECTIONS}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render the broker template with correct variables', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(mockApplication.referenceNumber),
        userName: getUserNameFromSession(req.session.user),
        address: mockApplication.broker[FULL_ADDRESS],
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
    it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
      post(req, res);

      const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${CHECK_YOUR_ANSWERS}`;

      expect(res.redirect).toHaveBeenCalledWith(expected);
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
