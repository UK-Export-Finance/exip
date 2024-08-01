import get from '.';
import generateRedirectUrl from '../../helpers/generate-redirect-url';
import { ROUTES } from '../../constants';
import { Request, Response } from '../../../types';
import { mockReq, mockRes } from '../../test-mocks';

const { PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

describe('controllers/redirects', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('when the req.original is valid', () => {
    beforeEach(() => {
      req = mockReq();
    });

    it('should redirect to a new URL via generateRedirectUrl helper function', () => {
      get(req, res);

      const expected = generateRedirectUrl(req.originalUrl);

      expect(res.redirect).toHaveBeenCalledTimes(1);
      expect(res.redirect).toHaveBeenCalledWith(expected);
    });
  });

  describe('when the req.original is invalid', () => {
    beforeEach(() => {
      const invalid = { forgery: true };
      // @ts-ignore
      req.originalUrl = invalid;
    });

    it(`should redirect to a ${PROBLEM_WITH_SERVICE}`, () => {
      get(req, res);

      expect(res.redirect).toHaveBeenCalledTimes(1);
      expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
    });
  });
});
