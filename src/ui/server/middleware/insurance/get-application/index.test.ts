import getApplicationMiddleware, { RELEVANT_ROUTES } from '.';
import { ROUTES } from '../../../constants';
import api from '../../../api';
import { mockReq, mockRes, mockApplication } from '../../../test-mocks';
import { Next, Request, Response } from '../../../../types';

const {
  INSURANCE_ROOT,
  ELIGIBILITY_ROOT,
  ELIGIBILITY: { CHECK_IF_ELIGIBLE },
  ALL_SECTIONS,
  POLICY_AND_EXPORTS,
  EXPORTER_BUSINESS,
  YOUR_BUYER,
  CHECK_YOUR_ANSWERS,
} = ROUTES.INSURANCE;

describe('middleware/insurance/get-application', () => {
  let req: Request;
  let res: Response;
  let next: Next;

  const nextSpy = jest.fn();

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
    next = nextSpy;

    req.params.referenceNumber = String(mockApplication.referenceNumber);
  });

  describe('RELEVANT_ROUTES', () => {
    it('should return an array of routes', () => {
      const expected = [ALL_SECTIONS, POLICY_AND_EXPORTS.ROOT, EXPORTER_BUSINESS.ROOT, YOUR_BUYER.ROOT, CHECK_YOUR_ANSWERS.ROOT];

      expect(RELEVANT_ROUTES).toEqual(expected);
    });
  });

  describe('when the route is not relevant', () => {
    beforeEach(() => {
      req.originalUrl = `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}${CHECK_IF_ELIGIBLE}`;
      next = nextSpy;
    });

    it('should call next()', async () => {
      await getApplicationMiddleware(req, res, next);

      expect(nextSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('when the route contains a relevant route', () => {
    beforeEach(() => {
      req.originalUrl = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${ALL_SECTIONS}`;
    });

    describe('when an application exists', () => {
      const getApplicationSpy = jest.fn(() => Promise.resolve(mockApplication));

      beforeEach(() => {
        api.keystone.application.get = getApplicationSpy;
        next = nextSpy;
      });

      it('should call next()', async () => {
        await getApplicationMiddleware(req, res, next);

        expect(nextSpy).toHaveBeenCalledTimes(1);
      });

      it('should add the application to res.locals', async () => {
        await getApplicationMiddleware(req, res, next);

        expect(res.locals.application).toEqual(mockApplication);
      });
    });

    describe('when an application is not returned from the API', () => {
      const getApplicationSpy = jest.fn(() => Promise.resolve());

      beforeEach(() => {
        api.keystone.application.get = getApplicationSpy;
      });

      it(`should redirect to ${ROUTES.INSURANCE.PAGE_NOT_FOUND}`, async () => {
        await getApplicationMiddleware(req, res, next);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.INSURANCE.PAGE_NOT_FOUND);
      });
    });

    describe('when the API call fails', () => {
      const getApplicationSpy = jest.fn(() => Promise.reject());

      beforeEach(() => {
        api.keystone.application.get = getApplicationSpy;
      });

      it(`should redirect to ${ROUTES.INSURANCE.PAGE_NOT_FOUND}`, async () => {
        await getApplicationMiddleware(req, res, next);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.INSURANCE.PAGE_NOT_FOUND);
      });
    });

    describe('when there no req.params.referenceNumber', () => {
      it(`should redirect to ${ROUTES.INSURANCE.PAGE_NOT_FOUND}`, async () => {
        delete req.params.referenceNumber;
        await getApplicationMiddleware(req, res, next);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.INSURANCE.PAGE_NOT_FOUND);
      });
    });
  });
});
