import { TEMPLATE, get } from '.';
import { PAGES } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import { Request, Response } from '../../../../types';
import { mockReq, mockRes } from '../../../test-mocks';
import corePageVariables from '../../../helpers/page-variables/core';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';

describe('controllers/root/contact-us', () => {
  let req: Request;
  let res: Response;

  const mockFlash = jest.fn();

  beforeEach(() => {
    req = mockReq();
    req.flash = mockFlash;

    res = mockRes();
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.CONTACT_US);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...corePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.CONTACT_US_PAGE,
          BACK_LINK: req.headers.referer,
          ORIGINAL_URL: req.originalUrl,
        }),
        userName: getUserNameFromSession(req.session.user),
      });
    });
  });
});
