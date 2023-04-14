import { TEMPLATE, get } from '.';
import { PAGES, PRODUCT, LINKS } from '../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../constants';
import { Request, Response } from '../../../../types';
import { mockReq, mockRes } from '../../../test-mocks';
import corePageVariables from '../../../helpers/page-variables/core';

const startRoute = ROUTES.QUOTE.START;

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
          PRODUCT: { DESCRIPTION: PRODUCT.DESCRIPTION.GENERIC },
          START_ROUTE: startRoute,
          FEEDBACK_ROUTE: LINKS.EXTERNAL.FEEDBACK,
        }),
      });
    });
  });
});
