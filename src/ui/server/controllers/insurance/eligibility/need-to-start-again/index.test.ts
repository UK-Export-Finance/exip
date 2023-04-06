import { get, post } from '.';
import { PAGES } from '../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../constants';
import corePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { mockReq, mockRes } from '../../../../test-mocks';
import { Request, Response } from '../../../../../types';

const buyerCountryRoute = ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY;

describe('controllers/insurance/eligibility/need-to-start-again', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('get', () => {
    it('should render template', async () => {
      await get(req, res);

      const expectedVariables = {
        ...corePageVariables({ PAGE_CONTENT_STRINGS: PAGES.NEED_TO_START_AGAIN_PAGE, BACK_LINK: req.headers.referer }),
        userName: getUserNameFromSession(req.session.user),
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.SHARED_PAGES.NEED_TO_START_AGAIN, expectedVariables);
    });
  });

  describe('post', () => {
    it(`should redirect to ${buyerCountryRoute}`, async () => {
      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(buyerCountryRoute);
    });
  });
});
