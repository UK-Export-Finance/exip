import applicationAccessMiddleware, { IRRELEVANT_ROUTES } from '.';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { Next, Request, ResponseInsurance } from '../../../../types';
import { mockReq, mockResInsurance, mockApplication, mockAccount, referenceNumber } from '../../../test-mocks';

const {
  INSURANCE_ROOT,
  PAGE_NOT_FOUND,
  ELIGIBILITY,
  ACCOUNT,
  DASHBOARD,
  DASHBOARD_PAGE,
  NO_ACCESS_TO_APPLICATION,
  ALL_SECTIONS,
  NO_ACCESS_APPLICATION_SUBMITTED,
  COOKIES,
  COOKIES_SAVED,
} = INSURANCE_ROUTES;

describe('middleware/insurance/application-access', () => {
  let req: Request;
  let res: ResponseInsurance;
  let next: Next;

  const nextSpy = jest.fn();

  beforeEach(() => {
    req = mockReq();
    res = mockResInsurance();
    next = nextSpy;
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
        DASHBOARD_PAGE,
        NO_ACCESS_TO_APPLICATION,
        NO_ACCESS_APPLICATION_SUBMITTED,
        COOKIES,
        COOKIES_SAVED,
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

    describe(`when the route includes ${DASHBOARD_PAGE}`, () => {
      beforeEach(() => {
        req.baseUrl = `${DASHBOARD_PAGE}/10`;
        next = nextSpy;
      });

      it('should call next()', async () => {
        await applicationAccessMiddleware(req, res, next);

        expect(nextSpy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('when the route contains a relevant route', () => {
    beforeEach(() => {
      req.baseUrl = `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;
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
        req.session.user = {
          ...mockAccount,
          id: '1234',
        };

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
          owner: {
            ...mockApplication.owner,
            id: '',
          },
        };

        next = nextSpy;
      });

      it(`should redirect to ${NO_ACCESS_TO_APPLICATION}`, async () => {
        await applicationAccessMiddleware(req, res, next);

        expect(res.redirect).toHaveBeenCalledWith(NO_ACCESS_TO_APPLICATION);
      });
    });
  });
});
