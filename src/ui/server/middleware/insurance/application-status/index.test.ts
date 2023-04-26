import applicationStatusMiddleware from '.';
import { ROUTES } from '../../../constants/routes';
import { APPLICATION } from '../../../constants';
import { mockReq, mockRes, mockApplication, mockAccount } from '../../../test-mocks';
import { Next, Request, Response } from '../../../../types';

const {
  INSURANCE: { INSURANCE_ROOT, NO_ACCESS_APPLICATION_SUBMITTED, APPLICATION_SUBMITTED },
} = ROUTES;

describe('middleware/insurance/application-status', () => {
  let req: Request;
  let res: Response;
  let next: Next;

  const nextSpy = jest.fn();

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
    next = nextSpy;

    res.locals.application = mockApplication;
  });

  describe('when res.locals.application has status of submitted', () => {
    beforeEach(() => {
      req.session.user = {
        ...mockAccount,
        id: mockApplication.exporter.id,
      };

      res.locals.application = {
        ...mockApplication,
        status: APPLICATION.STATUS.SUBMITTED,
        id: mockApplication.exporter.id,
      };

      next = nextSpy;
    });

    it(`should redirect to ${NO_ACCESS_APPLICATION_SUBMITTED}`, async () => {
      await applicationStatusMiddleware(req, res, next);

      expect(res.redirect).toHaveBeenCalledWith(NO_ACCESS_APPLICATION_SUBMITTED);
    });
  });

  describe(`when res.locals.application has status of submitted but route is ${APPLICATION_SUBMITTED}`, () => {
    beforeEach(() => {
      req.session.user = {
        ...mockAccount,
        id: mockApplication.exporter.id,
      };

      res.locals.application = {
        ...mockApplication,
        status: APPLICATION.STATUS.SUBMITTED,
        id: mockApplication.exporter.id,
      };

      req.baseUrl = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${APPLICATION_SUBMITTED}`;

      next = nextSpy;
    });

    it('should call next()', async () => {
      await applicationStatusMiddleware(req, res, next);

      expect(nextSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('when res.locals.application does not have a status of submitted', () => {
    beforeEach(() => {
      req.session.user = {
        ...mockAccount,
        id: mockApplication.exporter.id,
      };

      res.locals.application = {
        ...mockApplication,
        id: mockApplication.exporter.id,
      };

      next = nextSpy;
    });

    it('should call next()', async () => {
      await applicationStatusMiddleware(req, res, next);

      expect(nextSpy).toHaveBeenCalledTimes(1);
    });
  });
});
