import get from '.';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { Request, Response } from '../../../../types';
import { mockReq, mockRes } from '../../../test-mocks';

const {
  ELIGIBILITY: { CHECK_IF_ELIGIBLE },
} = INSURANCE_ROUTES;

describe('controllers/redirects/start', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  it('should redirect to a new URL via generateRedirectUrl helper function', () => {
    get(req, res);

    expect(res.redirect).toHaveBeenCalledTimes(1);
    expect(res.redirect).toHaveBeenCalledWith(CHECK_IF_ELIGIBLE);
  });
});
