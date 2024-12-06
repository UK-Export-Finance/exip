import { PAGE_CONTENT_STRINGS, TEMPLATE, pageVariables, get } from '.';
import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, referenceNumber } from '../../../../test-mocks';

const {
  INSURANCE_ROOT,
  PROBLEM_WITH_SERVICE,
  POLICY: { BROKER_DETAILS_ROOT, BROKER_MANUAL_ADDRESS_ROOT },
} = INSURANCE_ROUTES;

const tempMockPostcode = 'W1A 1AA';

describe('controllers/insurance/policy/broker-zero-addresses', () => {
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
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.POLICY.BROKER_ZERO_ADDRESSES);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.POLICY.BROKER_ZERO_ADDRESSES);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(referenceNumber);

      const expected = {
        SEARCH_AGAIN_URL: `${INSURANCE_ROOT}/${referenceNumber}${BROKER_DETAILS_ROOT}`,
        ENTER_MANUALLY_URL: `${INSURANCE_ROOT}/${referenceNumber}${BROKER_MANUAL_ADDRESS_ROOT}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(referenceNumber),
        userName: getUserNameFromSession(req.session.user),
        postcode: tempMockPostcode,
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
});
