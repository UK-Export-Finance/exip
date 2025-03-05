import getApplicationByReferenceNumberMiddleware, { RELEVANT_ROUTES } from '.';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import api from '../../../api';
import { mockReq, mockResInsurance, mockApplication, mockSpyPromiseRejection, referenceNumber } from '../../../test-mocks';
import { Next, Request, ResponseInsurance } from '../../../../types';

const {
  ACCESSIBILITY_STATEMENT,
  ALL_SECTIONS,
  APPLICATION_SUBMITTED,
  CHECK_YOUR_ANSWERS: {
    TYPE_OF_POLICY: CHECK_YOUR_ANSWERS_APPLICATION_TYPE_OF_POLICY,
    YOUR_BUSINESS: CHECK_YOUR_ANSWERS_APPLICATION_YOUR_BUSINESS,
    YOUR_BUYER: CHECK_YOUR_ANSWERS_APPLICATION_YOUR_BUYER,
  },
  COMPLETE_OTHER_SECTIONS,
  DECLARATIONS,
  EXPORTER_BUSINESS,
  EXPORT_CONTRACT,
  INSURANCE_ROOT,
  PAGE_NOT_FOUND,
  POLICY,
  YOUR_BUYER,
} = INSURANCE_ROUTES;

describe('middleware/insurance/get-application-by-reference-number', () => {
  let req: Request;
  let res: ResponseInsurance;
  let next: Next;

  const nextSpy = jest.fn();

  beforeEach(() => {
    req = mockReq();
    res = mockResInsurance();
    next = nextSpy;
  });

  describe('RELEVANT_ROUTES', () => {
    it('should return an array of routes', () => {
      const expected = [
        ALL_SECTIONS,
        EXPORTER_BUSINESS.ROOT,
        POLICY.ROOT,
        YOUR_BUYER.ROOT,
        EXPORT_CONTRACT.ROOT,
        DECLARATIONS.ROOT,
        CHECK_YOUR_ANSWERS_APPLICATION_TYPE_OF_POLICY,
        CHECK_YOUR_ANSWERS_APPLICATION_YOUR_BUSINESS,
        CHECK_YOUR_ANSWERS_APPLICATION_YOUR_BUYER,
        COMPLETE_OTHER_SECTIONS,
        APPLICATION_SUBMITTED,
      ];

      expect(RELEVANT_ROUTES).toEqual(expected);
    });
  });

  describe('when the route is not relevant', () => {
    beforeEach(() => {
      req.originalUrl = `${INSURANCE_ROOT}${ACCESSIBILITY_STATEMENT}`;
      next = nextSpy;
    });

    it('should call next()', async () => {
      await getApplicationByReferenceNumberMiddleware(req, res, next);

      expect(nextSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('when the route contains a relevant route', () => {
    beforeEach(() => {
      req.originalUrl = `${INSURANCE_ROOT}/${referenceNumber}${POLICY.LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT}`;
    });

    describe('when an application exists', () => {
      const getApplicationSpy = jest.fn(() => Promise.resolve(mockApplication));

      beforeEach(() => {
        api.keystone.application.getByReferenceNumber = getApplicationSpy;
        next = nextSpy;
      });

      it('should call next()', async () => {
        await getApplicationByReferenceNumberMiddleware(req, res, next);

        expect(nextSpy).toHaveBeenCalledTimes(1);
      });

      it('should call add the application to res.locals.application', async () => {
        await getApplicationByReferenceNumberMiddleware(req, res, next);

        expect(res.locals.application).toEqual(mockApplication);
      });
    });

    describe('when an application is not returned from the API', () => {
      const getApplicationSpy = jest.fn(() => Promise.resolve());

      beforeEach(() => {
        api.keystone.application.getByReferenceNumber = getApplicationSpy;
      });

      it(`should redirect to ${PAGE_NOT_FOUND}`, async () => {
        await getApplicationByReferenceNumberMiddleware(req, res, next);

        expect(res.redirect).toHaveBeenCalledWith(PAGE_NOT_FOUND);
      });
    });

    describe('when the API call fails', () => {
      const getApplicationSpy = mockSpyPromiseRejection;

      beforeEach(() => {
        api.keystone.application.getByReferenceNumber = getApplicationSpy;
      });

      it(`should redirect to ${PAGE_NOT_FOUND}`, async () => {
        await getApplicationByReferenceNumberMiddleware(req, res, next);

        expect(res.redirect).toHaveBeenCalledWith(PAGE_NOT_FOUND);
      });
    });

    describe('when there no req.params.referenceNumber', () => {
      it(`should redirect to ${PAGE_NOT_FOUND}`, async () => {
        delete req.params.referenceNumber;
        await getApplicationByReferenceNumberMiddleware(req, res, next);

        expect(res.redirect).toHaveBeenCalledWith(PAGE_NOT_FOUND);
      });
    });
  });
});
