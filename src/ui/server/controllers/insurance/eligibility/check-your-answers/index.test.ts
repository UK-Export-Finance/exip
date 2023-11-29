import { PAGE_VARIABLES, TEMPLATE, get, post } from '.';
import { PAGES } from '../../../../content-strings';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import corePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { Request, Response, InsuranceEligibility } from '../../../../../types';
import { mockReq, mockRes, mockSession } from '../../../../test-mocks';
import { eligibilitySummaryList } from '../../../../helpers/summary-lists/eligibility';
import { updateSubmittedData } from '../../../../helpers/update-submitted-data/insurance';

const { ELIGIBLE_TO_APPLY_ONLINE } = INSURANCE_ROUTES.ELIGIBILITY;

const { HAS_REVIEWED_ELIGIBILITY } = INSURANCE_FIELD_IDS.ELIGIBILITY;

describe('controllers/insurance/eligibility/check-your-answers', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.ELIGIBILITY.CHECK_YOUR_ANSWERS,
      };

      expect(PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.ELIGIBILITY.CHECK_YOUR_ANSWERS);
    });
  });

  describe('get', () => {
    beforeEach(() => {
      req.session.submittedData.insuranceEligibility = mockSession.submittedData.insuranceEligibility;
    });

    it('should render template', () => {
      get(req, res);

      const summaryList = eligibilitySummaryList(req.session.submittedData.insuranceEligibility as InsuranceEligibility);

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...corePageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }),
        userName: getUserNameFromSession(req.session.user),
        SUMMARY_LIST: summaryList,
      });
    });
  });

  describe('post', () => {
    it(`should redirect to ${ELIGIBLE_TO_APPLY_ONLINE}`, () => {
      post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(ELIGIBLE_TO_APPLY_ONLINE);
    });

    it('should update the session with submitted data, populated with the answer', () => {
      post(req, res);

      const expectedPopulatedData = {
        [HAS_REVIEWED_ELIGIBILITY]: true,
      };

      const expected = {
        ...req.session.submittedData,
        insuranceEligibility: updateSubmittedData(expectedPopulatedData, req.session.submittedData.insuranceEligibility),
      };

      expect(req.session.submittedData).toEqual(expected);
    });
  });
});
