import { TEMPLATE, get, post } from '.';
import { PAGES } from '../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import corePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { mockReq, mockRes } from '../../../../test-mocks';
import { Request, Response } from '../../../../../types';

const {
  ELIGIBILITY: { CREDIT_PERIOD },
} = FIELD_IDS;

describe('controllers/insurance/eligibility/check-if-eligible', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE);
    });
  });

  describe('get', () => {
    it('should add an empty submittedData object to the session', () => {
      req.session = {
        submittedData: {
          quoteEligibility: {
            [CREDIT_PERIOD]: 1,
          },
          insuranceEligibility: {
            [FIELD_IDS.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER]: true,
          },
        },
      };

      get(req, res);

      expect(req.session.submittedData).toEqual({
        quoteEligibility: {
          [CREDIT_PERIOD]: 1,
        },
        insuranceEligibility: {},
      });
    });

    it('should render template', () => {
      get(req, res);

      const expectedVariables = {
        ...corePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });
  });

  describe('post', () => {
    it(`should redirect to ${ROUTES.INSURANCE.ELIGIBILITY.EXPORTER_LOCATION}`, () => {
      post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.EXPORTER_LOCATION);
    });
  });
});
