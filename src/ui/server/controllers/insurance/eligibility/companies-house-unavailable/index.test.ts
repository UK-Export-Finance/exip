import { PAGE_CONTENT_STRINGS, TEMPLATE, get } from '.';
import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes } from '../../../../test-mocks';

const {
  ELIGIBILITY: { ENTER_COMPANIES_HOUSE_NUMBER },
} = INSURANCE_ROUTES;

describe('controllers/insurance/eligibility/companies-house-unavailable', () => {
  let req: Request;
  let res: Response;

  jest.mock('../../../../helpers/companies-house-search');

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct template defined', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_UNAVAILABLE);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_UNAVAILABLE);
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
        userName: getUserNameFromSession(req.session.user),
        TRY_AGAIN_HREF: ENTER_COMPANIES_HOUSE_NUMBER,
      });
    });
  });
});
