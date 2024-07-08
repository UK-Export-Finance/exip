import { get } from '.';
import { LINKS } from '../../../content-strings';
import { Request, Response } from '../../../../types';
import { mockReq, mockRes } from '../../../test-mocks';

describe('controllers/insurance/start', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('get', () => {
    it(`should redirect to ${LINKS.EXTERNAL.FULL_APPLICATION}`, () => {
      get(req, res);

      expect(res.redirect).toHaveBeenCalledTimes(1);
      expect(res.redirect).toHaveBeenCalledWith(LINKS.EXTERNAL.FULL_APPLICATION);
    });
  });
});
