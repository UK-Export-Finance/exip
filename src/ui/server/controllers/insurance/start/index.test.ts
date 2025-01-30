import { get } from '.';
import { LINKS } from '../../../content-strings';
import { Request, ResponseInsurance } from '../../../../types';
import { mockReq, mockResInsurance } from '../../../test-mocks';

describe('controllers/insurance/start', () => {
  let req: Request;
  let res: ResponseInsurance;

  beforeEach(() => {
    req = mockReq();
    res = mockResInsurance();
  });

  describe('get', () => {
    it(`should redirect to ${LINKS.EXTERNAL.FULL_APPLICATION}`, () => {
      get(req, res);

      expect(res.redirect).toHaveBeenCalledTimes(1);
      expect(res.redirect).toHaveBeenCalledWith(LINKS.EXTERNAL.FULL_APPLICATION);
    });
  });
});
