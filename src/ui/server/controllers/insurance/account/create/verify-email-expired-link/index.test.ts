import { TEMPLATE, PAGE_CONTENT_STRINGS, get } from '.';
import { PAGES } from '../../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../../constants';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import { sanitiseValue } from '../../../../../helpers/sanitise-data';
import getUserNameFromSession from '../../../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../../../types';
import { mockAccount, mockReq, mockRes } from '../../../../../test-mocks';

const {
  INSURANCE: {
    ACCOUNT: {
      CREATE: { CONFIRM_EMAIL },
    },
    PROBLEM_WITH_SERVICE,
  },
} = ROUTES;

describe('controllers/insurance/account/create/verify-email-expired-link', () => {
  let req: Request;
  let res: Response;

  const mockQueryId = mockAccount.id;

  beforeEach(() => {
    req = mockReq();

    req.query = {
      id: mockQueryId,
    };

    res = mockRes();
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.ACCOUNT.CREATE.VERIFY_EMAIL_EXPIRED_LINK);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.ACCOUNT.CREATE.VERIFY_EMAIL_EXPIRED_LINK);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      const sanitisedId = String(sanitiseValue({ value: mockQueryId }));

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: `${CONFIRM_EMAIL}?id=${sanitisedId}`,
        }),
        userName: getUserNameFromSession(req.session.user),
      });
    });

    describe('when req.query.id does NOT exist', () => {
      beforeEach(() => {
        req.query = {};
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
