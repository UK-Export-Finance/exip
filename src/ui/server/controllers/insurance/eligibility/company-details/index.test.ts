import { TEMPLATE, PAGE_CONTENT_STRINGS, get, post } from '.';
import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { companiesHouseSummaryList } from '../../../../helpers/summary-lists/companies-house';
import { Request, Response } from '../../../../../types';
import { mockCompany, mockReq, mockRes } from '../../../../test-mocks';

const {
  ELIGIBILITY: { COMPANY_DETAILS_CHANGE, BUYER_COUNTRY, NEED_TO_START_AGAIN, ENTER_COMPANIES_HOUSE_NUMBER, CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

describe('controllers/insurance/eligibility/company-details', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();

    req.session.submittedData.insuranceEligibility = {
      ...req.session.submittedData.insuranceEligibility,
      company: mockCompany,
    };

    res = mockRes();
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.ELIGIBILITY.COMPANY_DETAILS);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.ELIGIBILITY.COMPANY_DETAILS);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      const { company } = req.session.submittedData.insuranceEligibility;

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
        SUMMARY_LIST: companiesHouseSummaryList(company),
        DIFFERENT_COMPANIES_HOUSE_NUMBER_URL: ENTER_COMPANIES_HOUSE_NUMBER,
      });
    });

    describe('when company does not exist in req.session.submittedData.insuranceEligibility', () => {
      it(`should redirect to ${NEED_TO_START_AGAIN}`, () => {
        req.session.submittedData.insuranceEligibility = {};

        get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(NEED_TO_START_AGAIN);
      });
    });
  });

  describe('post', () => {
    it(`should redirect to ${BUYER_COUNTRY}`, () => {
      post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(BUYER_COUNTRY);
    });
  });

  describe("when the url's last substring is `change`", () => {
    it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
      req.originalUrl = COMPANY_DETAILS_CHANGE;

      await post(req, res);

      const expected = CHECK_YOUR_ANSWERS;
      expect(res.redirect).toHaveBeenCalledWith(expected);
    });
  });
});
