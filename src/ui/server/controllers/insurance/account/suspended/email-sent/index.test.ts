import { TEMPLATE, PAGE_CONTENT_STRINGS, get } from '.';
import { PAGES } from '../../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../../constants';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import { CUSTOMER_SERVICE_CONTACT_DETAILS } from '../../../../../content-strings/contact';
import { Request, Response } from '../../../../../../types';
import { mockReq, mockRes, mockAccount } from '../../../../../test-mocks';

const { PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

describe('controllers/insurance/account/suspended/link-sent', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();

    req.session.emailAddressForAccountReactivation = mockAccount.email;

    res = mockRes();
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.ACCOUNT.SUSPENDED.EMAIL_SENT);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.ACCOUNT.SUSPENDED.EMAIL_SENT);
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
      CUSTOMER_SERVICE_CONTACT_DETAILS,
    });
  });

  it('should add req.session.emailAddressForAccountReactivation to req.flash', () => {
    get(req, res);

    expect(req.flash).toHaveBeenCalledWith('emailAddressForAccountReactivation', mockAccount.email);
  });

  it('should delete emailAddressForAccountReactivation from req.session', async () => {
    get(req, res);

    expect(req.session.emailAddressForAccountReactivation).toBeUndefined();
  });

  describe('when there is no req.session.emailAddressForAccountReactivation', () => {
    beforeEach(() => {
      delete req.session.emailAddressForAccountReactivation;
    });

    it(`should redirect to ${PROBLEM_WITH_SERVICE}`, () => {
      get(req, res);

      expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
    });
  });
});
