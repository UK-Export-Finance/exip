import { TEMPLATE, PAGE_CONTENT_STRINGS, get } from '.';
import { PAGES } from '../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../constants';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../../types';
import { mockAccount, mockReq, mockRes } from '../../../../test-mocks';

const {
  INSURANCE: {
    ACCOUNT: { SIGN_IN },
  },
} = ROUTES;

describe('controllers/insurance/account/signed-out', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    req.session.user = mockAccount;

    res = mockRes();
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.ACCOUNT.SIGNED_OUT);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.ACCOUNT.SIGNED_OUT);
    });
  });

  describe('get', () => {
    it('should delete req.session.user', () => {
      get(req, res);

      expect(req.session.user).toBeUndefined();
    });

    it('should render template', () => {
      get(req, res);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        SIGN_IN_LINK: SIGN_IN.ROOT,
        userName: getUserNameFromSession(req.session.user),
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });
  });
});
