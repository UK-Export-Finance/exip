import { TEMPLATE, PAGE_CONTENT_STRINGS, get } from '.';
import { PAGES } from '../../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../../constants';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import { Request, Response } from '../../../../../../types';
import { mockReq, mockRes, mockAccount } from '../../../../../test-mocks';

const { PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

describe('controllers/insurance/account/password-reset/link-sent', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();

    req.session.emailAddressForPasswordReset = mockAccount.email;

    res = mockRes();
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.ACCOUNT.PASSWORD_RESET.LINK_SENT);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.ACCOUNT.PASSWORD_RESET.LINK_SENT);
    });
  });

  it('should render template', () => {
    get(req, res);

    expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS,
        BACK_LINK: req.headers.referer,
      }),
      accountEmail: mockAccount.email,
    });
  });

  it('should add req.session.emailAddressForPasswordReset to req.flash', () => {
    get(req, res);

    expect(req.flash).toHaveBeenCalledWith('emailAddressForPasswordReset', mockAccount.email);
  });

  it('should delete emailAddressForPasswordReset from req.session', async () => {
    get(req, res);

    expect(req.session.emailAddressForPasswordReset).toBeUndefined();
  });

  describe('when there is no req.session.emailAddressForPasswordReset', () => {
    beforeEach(() => {
      delete req.session.emailAddressForPasswordReset;
    });

    it(`should redirect to ${PROBLEM_WITH_SERVICE}`, () => {
      get(req, res);

      expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
    });
  });
});
