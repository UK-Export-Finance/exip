import get from '.';
import { PAGES } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import corePageVariables from '../../../helpers/core-page-variables';
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

  it('should render template with values from req.flash', () => {
    get(req, res);

    expect(res.render).toHaveBeenCalledWith(TEMPLATES.CANNOT_APPLY, {
      ...corePageVariables({ PAGE_CONTENT_STRINGS: PAGES.CANNOT_APPLY, BACK_LINK: mockPreviousRoute }),
      EXIT_REASON: mockExitReason,
    });
  });
});
