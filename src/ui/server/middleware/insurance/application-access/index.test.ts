import applicationAccessMiddleware, { IRRELEVANT_ROUTES } from '.';
import { ROUTES } from '../../../constants/routes';
import { mockReq, mockRes, mockApplication, mockAccount } from '../../../test-mocks';
import { Next, Request, Response } from '../../../../types';

const {
  INSURANCE: { INSURANCE_ROOT, PAGE_NOT_FOUND, ELIGIBILITY, ACCOUNT, DASHBOARD, NO_ACCESS_TO_APPLICATION, ALL_SECTIONS, NO_ACCESS_APPLICATION_SUBMITTED },
} = ROUTES;

describe('middleware/insurance/application-access', () => {
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

  describe('IRRELEVANT_ROUTES', () => {
    it('should return an array of routes', () => {
      const expected = [
        PAGE_NOT_FOUND,
        ...Object.values(ELIGIBILITY),
        ...Object.values(ACCOUNT.CREATE),
        ...Object.values(ACCOUNT.SIGN_IN),
        ...Object.values(ACCOUNT.PASSWORD_RESET),
        ...Object.values(ACCOUNT.SUSPENDED),
        ACCOUNT.REACTIVATED_ROOT,
        DASHBOARD,
        NO_ACCESS_TO_APPLICATION,
        NO_ACCESS_APPLICATION_SUBMITTED,
      ];

      expect(IRRELEVANT_ROUTES).toEqual(expected);
    });
  });

  describe('when the route is not relevant', () => {
    beforeEach(() => {
      req.baseUrl = DASHBOARD;
      next = nextSpy;
    });

    it('should call next()', async () => {
      await applicationAccessMiddleware(req, res, next);

      expect(nextSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('when the route contains a relevant route', () => {
    beforeEach(() => {
      req.baseUrl = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${ALL_SECTIONS}`;
    });

    describe("when req.session.user.id matches the application's owner ID", () => {
      beforeEach(() => {
        req.session.user = {
          ...mockAccount,
          id: mockApplication.owner.id,
        };

        next = nextSpy;
      });

      it('should call next()', async () => {
        await applicationAccessMiddleware(req, res, next);

        expect(nextSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe("when req.session.accountId does NOT match the application's owner ID", () => {
      beforeEach(() => {
        req.session.accountId = '1234';
        next = nextSpy;
      });

      it(`should redirect to ${NO_ACCESS_TO_APPLICATION}`, async () => {
        await applicationAccessMiddleware(req, res, next);

        expect(res.redirect).toHaveBeenCalledWith(NO_ACCESS_TO_APPLICATION);
      });
    });

    describe('when res.locals.application does not have an owner ID', () => {
      beforeEach(() => {
        res.locals.application = {
          ...mockApplication,
          // @ts-ignore
          owner: {},
        };

        next = nextSpy;
      });

      it(`should redirect to ${NO_ACCESS_TO_APPLICATION}`, async () => {
        await applicationAccessMiddleware(req, res, next);

        expect(res.redirect).toHaveBeenCalledWith(NO_ACCESS_TO_APPLICATION);
      });
    });

    describe('when there is no req.session.accountID or res.locals.application', () => {
      beforeEach(() => {
        delete req.session.accountId;
        delete res.locals.application;

        next = nextSpy;
      });

      it(`should redirect to ${NO_ACCESS_TO_APPLICATION}`, async () => {
        await applicationAccessMiddleware(req, res, next);

        expect(res.redirect).toHaveBeenCalledWith(NO_ACCESS_TO_APPLICATION);
      });
    });
  });
});
