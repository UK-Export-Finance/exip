import { get } from '.';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockAccount } from '../../../../test-mocks';

const {
  ACCOUNT: {
    SIGN_IN: { ROOT: SIGN_IN_ROOT },
  },
} = INSURANCE_ROUTES;

describe('controllers/insurance/account/sign-out', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();

    req.session.user = mockAccount;

    res = mockRes();
  });

  describe('get', () => {
    it('should delete req.session.user', () => {
      get(req, res);

      expect(req.session.user).toBeUndefined();
    });

    it('should add importantBanner to req.flash', () => {
      get(req, res);

      expect(req.flash).toHaveBeenCalledWith('importantBanner', 'successfulSignOut');
    });

    it(`should redirect to ${SIGN_IN_ROOT}`, async () => {
      get(req, res);

      expect(res.redirect).toHaveBeenCalledWith(SIGN_IN_ROOT);
    });
  });
});
