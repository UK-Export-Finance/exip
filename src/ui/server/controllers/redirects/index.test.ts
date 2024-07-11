import get from '.';
import generateRedirectUrl from '../../helpers/generate-redirect-url';
import { Request, Response } from '../../../types';
import { mockReq, mockRes } from '../../test-mocks';

describe('controllers/redirects', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  it('should redirect to a new URL via generateRedirectUrl helper function', () => {
    get(req, res);

    const expected = generateRedirectUrl(req.originalUrl);

    expect(res.redirect).toHaveBeenCalledTimes(1);
    expect(res.redirect).toHaveBeenCalledWith(expected);
  });
});
