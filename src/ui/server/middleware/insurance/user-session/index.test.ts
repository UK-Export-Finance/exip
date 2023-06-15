import userSessionMiddleware from '.';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { DATE_ONE_MINUTE_IN_THE_PAST } from '../../../constants/dates';
import { mockReq, mockRes, mockAccount } from '../../../test-mocks';
import { Next, Request, Response } from '../../../../types';

const {
  ACCOUNT: { SIGNED_OUT },
} = INSURANCE_ROUTES;

describe('middleware/insurance/user-session', () => {
  let req: Request;
  let res: Response;
  let next: Next;

  const nextSpy = jest.fn();

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
    next = nextSpy;
  });

  describe('when there is no user session', () => {
    beforeEach(() => {
      delete req.session.user;

      next = nextSpy;
    });

    it('should call next()', () => {
      userSessionMiddleware(req, res, next);

      expect(nextSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('when the current time is past req.session.user.expires', () => {
    beforeEach(() => {
      const oneMinuteInThePast = DATE_ONE_MINUTE_IN_THE_PAST();

      req.session.user = {
        ...mockAccount,
        expires: oneMinuteInThePast.toISOString(),
      };

      next = nextSpy;
    });

    it(`should redirect to ${SIGNED_OUT}`, () => {
      userSessionMiddleware(req, res, next);

      expect(res.redirect).toHaveBeenCalledWith(SIGNED_OUT);
    });
  });
});
