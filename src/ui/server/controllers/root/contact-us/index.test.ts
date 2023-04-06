import { PAGE_VARIABLES, TEMPLATE, get } from '.';
import { PAGES, PRODUCT } from '../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../constants';
import { Request, Response } from '../../../../types';
import singleInputPageVariables from '../../../helpers/page-variables/single-input';
import { mockReq, mockRes } from '../../../test-mocks';

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

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELD_ID: FIELD_IDS.CONTACT_US,
        PAGE_CONTENT_STRINGS: PAGES.CONTACT_US_PAGE,
        PRODUCT: { DESCRIPTION: PRODUCT.DESCRIPTION.GENERIC },
      };

      expect(PAGE_VARIABLES).toEqual(expected);
    });
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
        ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer, START_ROUTE: startRoute }),
      });
    });
  });
});
