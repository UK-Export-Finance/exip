import { TEMPLATE, PAGE_CONTENT_STRINGS, get } from '.';
import { PAGES } from '../../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../../constants';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import { Request, Response } from '../../../../../../types';
import { mockReq, mockRes } from '../../../../../test-mocks';

const {
  ACCOUNT: {
    SIGN_IN: { ROOT: SIGN_IN_ROOT },
    PASSWORD_RESET: { ROOT: PASSWORD_RESET_ROOT },
  },
} = ROUTES.INSURANCE;

describe('controllers/insurance/account/password-reset/success', () => {
  let req: Request;
  let res: Response;

  const mockPasswordResetSuccess = true;

  beforeEach(() => {
    req = mockReq();

    req.session.passwordResetSuccess = mockPasswordResetSuccess;

    res = mockRes();
  });

  describe('get', () => {
    describe('TEMPLATE', () => {
      it('should have the correct template defined', () => {
        expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.ACCOUNT.PASSWORD_RESET.SUCCESS);
      });
    });

    describe('PAGE_CONTENT_STRINGS', () => {
      it('should have the correct strings', () => {
        expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.ACCOUNT.PASSWORD_RESET.SUCCESS);
      });
    });

    it('should render template', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        SIGN_IN_URL: SIGN_IN_ROOT,
      });
    });

    it('should add req.session.passwordResetSuccess to req.flash', () => {
      get(req, res);

      expect(req.flash).toHaveBeenCalledWith('passwordResetSuccess', String(mockPasswordResetSuccess));
    });

    it('should delete req.session.passwordResetSuccess', () => {
      get(req, res);

      expect(req.session.passwordResetSuccess).toBeUndefined();
    });

    describe('when there is no req.session.passwordResetSuccess', () => {
      beforeEach(() => {
        req = mockReq();

        delete req.session.passwordResetSuccess;

        res = mockRes();
      });

      it(`should redirect to ${PASSWORD_RESET_ROOT}`, () => {
        get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PASSWORD_RESET_ROOT);
      });
    });
  });
});
