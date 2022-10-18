import get from '.';
import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import corePageVariables from '../../../../helpers/core-page-variables';
import { mockReq, mockRes } from '../../../../test-mocks';
import { Request, Response } from '../../../../../types';

describe('controllers/insurance/eligibility/apply-offline', () => {
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
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.ELIGIBILITY.APPLY_OFFLINE,
        BACK_LINK: req.headers.referer,
      }),
      EXIT_REASON: mockExitReason,
    };

    expect(res.render).toHaveBeenCalledWith(TEMPLATES.INSURANCE.ELIGIBILITY.APPLY_OFFLINE, expectedVariables);
  });
});
