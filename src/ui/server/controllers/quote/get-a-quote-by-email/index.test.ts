import get from '.';
import { PAGES } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import corePageVariables from '../../../helpers/page-variables/core/quote';
import { mockReq, mockRes } from '../../../test-mocks';
import { Request, Response } from '../../../../types';

describe('controllers/quote/get-a-quote-by-email', () => {
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

  it('should render template', () => {
    get(req, res);

    expect(res.render).toHaveBeenCalledWith(TEMPLATES.QUOTE.GET_A_QUOTE_BY_EMAIL, {
      ...corePageVariables({ PAGE_CONTENT_STRINGS: PAGES.QUOTE.GET_A_QUOTE_BY_EMAIL, BACK_LINK: mockPreviousRoute }),
      EXIT_REASON: mockExitReason,
    });
  });
});
