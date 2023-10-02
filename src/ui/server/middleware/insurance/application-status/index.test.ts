import applicationStatusMiddleware from '.';
import { ROUTES } from '../../../constants/routes';
import { APPLICATION } from '../../../constants';
import POLICY_AND_EXPORTS_FIELD_IDS from '../../../constants/field-ids/insurance/policy-and-exports';
import { mockReq, mockRes, mockApplication, mockAccount } from '../../../test-mocks';
import { Next, Request, Response } from '../../../../types';

const {
  INSURANCE: { INSURANCE_ROOT, NO_ACCESS_APPLICATION_SUBMITTED, APPLICATION_SUBMITTED, CHECK_YOUR_ANSWERS, COMPLETE_OTHER_SECTIONS },
} = ROUTES;

const {
  TYPE_OF_POLICY: { POLICY_TYPE },
} = POLICY_AND_EXPORTS_FIELD_IDS;

const { referenceNumber } = mockApplication;

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
