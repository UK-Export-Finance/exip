import get from '.';
import { mockReq, mockRes } from '../../test-mocks';
import { FIELD_IDS, ROUTES } from '../../constants';
import { Request, Response } from '../../../types';

describe('controllers/root', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('get', () => {
    it('should add an empty submittedData object to the session', () => {
      req.session = {
        submittedData: {
          [FIELD_IDS.CREDIT_PERIOD]: 1,
        },
      };

      get(req, res);

      expect(req.session.submittedData).toEqual({});
    });

    it(`should redirect to ${ROUTES.BUYER_COUNTRY}`, () => {
      get(req, res);

      expect(res.redirect).toHaveBeenCalledWith(ROUTES.BUYER_COUNTRY);
    });
  });
});
