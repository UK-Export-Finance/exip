import get from '.';
import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import corePageVariables from '../../../../helpers/page-variables/core/insurance';
import { mockReq, mockRes } from '../../../../test-mocks';
import { Request, Response } from '../../../../../types';

describe('controllers/insurance/eligibility/cannot-apply', () => {
  let req: Request;
  let res: Response;
  const mockExitReason = 'mock';

  beforeEach(() => {
    req = mockReq();
    req.flash = (property: string) => {
      const obj = {
        exitReason: mockExitReason,
      };

      return obj[property];
    };

    res = mockRes();
  });

  it('should render template', () => {
    get(req, res);

    const expectedVariables = {
      ...corePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.CANNOT_APPLY,
        BACK_LINK: req.headers.referer,
      }),
      EXIT_REASON: mockExitReason,
    };

    expect(res.render).toHaveBeenCalledWith(TEMPLATES.CANNOT_APPLY, expectedVariables);
  });
});
