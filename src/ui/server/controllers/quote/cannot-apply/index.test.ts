import { TEMPLATE, get } from '.';
import { PAGES } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import corePageVariables from '../../../helpers/page-variables/core/quote';
import { mockReq, mockRes } from '../../../test-mocks';
import { Request, Response } from '../../../../types';

describe('controllers/quote/cannot-apply', () => {
  let req: Request;
  let res: Response;
  const mockExitReason = 'mock';
  const mockPreviousRoute = '/test';

  beforeEach(() => {
    req = mockReq();

    req.flash = (property: string) => {
      const obj = {
        exitReason: mockExitReason,
        previousRoute: mockPreviousRoute,
      };

      return obj[property];
    };

    res = mockRes();
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.CANNOT_APPLY);
    });
  });

  describe('get', () => {
    it('should render template with values from req.flash', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...corePageVariables({ PAGE_CONTENT_STRINGS: PAGES.CANNOT_APPLY, BACK_LINK: mockPreviousRoute }),
        user: req.session.user,
        EXIT_REASON: mockExitReason,
      });
    });
  });
});
