import applicationStatusMiddleware from '.';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { APPLICATION } from '../../../constants';
import POLICY_FIELD_IDS from '../../../constants/field-ids/insurance/policy';
import { mockReq, mockRes, mockApplication, mockAccount, referenceNumber } from '../../../test-mocks';
import { Next, Request, Response } from '../../../../types';

const { APPLICATION_SUBMITTED, NO_ACCESS_TO_APPLICATION, NO_ACCESS_APPLICATION_SUBMITTED, INSURANCE_ROOT, COMPLETE_OTHER_SECTIONS, CHECK_YOUR_ANSWERS } =
  INSURANCE_ROUTES;

const {
  TYPE_OF_POLICY: { POLICY_TYPE },
} = POLICY_FIELD_IDS;

describe('middleware/insurance/application-status', () => {
  let req: Request;
  let res: Response;
  let next: Next;

  const nextSpy = jest.fn();

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
    next = nextSpy;
  });

  describe(`when res.locals.application has status of ${APPLICATION.STATUS.SUBMITTED}`, () => {
    beforeEach(() => {
      req.session.user = {
        ...mockAccount,
        id: mockApplication.owner.id,
      };

      res.locals.application = {
        ...mockApplication,
        status: APPLICATION.STATUS.SUBMITTED,
        id: mockApplication.owner.id,
      };

      next = nextSpy;
    });

    it(`should redirect to ${NO_ACCESS_APPLICATION_SUBMITTED}`, async () => {
      await applicationStatusMiddleware(req, res, next);

      expect(res.redirect).toHaveBeenCalledWith(NO_ACCESS_APPLICATION_SUBMITTED);
    });

    describe(`when res.locals.application has a status of ${APPLICATION.STATUS.ABANDONED}`, () => {
      beforeEach(() => {
        req.session.user = {
          ...mockAccount,
          id: mockApplication.owner.id,
        };

        res.locals.application = {
          ...mockApplication,
          status: APPLICATION.STATUS.ABANDONED,
          id: mockApplication.owner.id,
        };

        next = nextSpy;
      });

      it(`should redirect to ${NO_ACCESS_TO_APPLICATION}`, async () => {
        await applicationStatusMiddleware(req, res, next);

        expect(res.redirect).toHaveBeenCalledWith(NO_ACCESS_TO_APPLICATION);
      });
    });

    describe(`when the route is ${APPLICATION_SUBMITTED}`, () => {
      beforeEach(() => {
        req.session.user = {
          ...mockAccount,
          id: mockApplication.owner.id,
        };

        res.locals.application = {
          ...mockApplication,
          status: APPLICATION.STATUS.SUBMITTED,
          id: mockApplication.owner.id,
        };

        req.baseUrl = `${INSURANCE_ROOT}/${referenceNumber}${APPLICATION_SUBMITTED}`;

        next = nextSpy;
      });

      it('should call next()', async () => {
        await applicationStatusMiddleware(req, res, next);

        expect(nextSpy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe(`when res.locals.application does NOT have a status of ${APPLICATION.STATUS.SUBMITTED}`, () => {
    beforeEach(() => {
      req.session.user = {
        ...mockAccount,
        id: mockApplication.owner.id,
      };

      res.locals.application = {
        ...mockApplication,
        id: mockApplication.owner.id,
      };

      next = nextSpy;
    });

    it('should call next()', async () => {
      await applicationStatusMiddleware(req, res, next);

      expect(nextSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('when the route is a "check your answers" route', () => {
    beforeEach(() => {
      req.baseUrl = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS.TYPE_OF_POLICY}`;

      next = nextSpy;
    });

    describe('when an application has all required fields/answers for the "check your answers" routes/section', () => {
      it('should call next()', async () => {
        await applicationStatusMiddleware(req, res, next);

        expect(nextSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('when an application does NOT have all required fields/answers for the "check your answers" routes/section', () => {
      beforeEach(() => {
        const mockApplicationWithIncompleteFields = mockApplication;

        delete mockApplicationWithIncompleteFields.policy[POLICY_TYPE];

        res.locals.application = mockApplicationWithIncompleteFields;
      });

      it(`should redirect to ${COMPLETE_OTHER_SECTIONS}`, async () => {
        await applicationStatusMiddleware(req, res, next);

        const expectedUrl = `${INSURANCE_ROOT}/${referenceNumber}${COMPLETE_OTHER_SECTIONS}`;

        expect(res.redirect).toHaveBeenCalledWith(expectedUrl);
      });
    });
  });
});
