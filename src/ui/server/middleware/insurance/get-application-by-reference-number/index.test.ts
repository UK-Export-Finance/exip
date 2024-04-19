import getApplicationByReferenceNumberMiddleware, { RELEVANT_ROUTES } from '.';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import api from '../../../api';
import { mockReq, mockRes, mockApplication, referenceNumber } from '../../../test-mocks';
import { Next, Request, Response } from '../../../../types';

const { POLICY } = INSURANCE_ROUTES;
const {
  INSURANCE_ROOT,
  ALL_SECTIONS,
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY: CHECK_YOUR_ANSWERS_APPLICATION_TYPE_OF_POLICY },
} = INSURANCE_ROUTES;

describe('middleware/insurance/get-application-by-reference-number', () => {
  let req: Request;
  let res: Response;
  let next: Next;

  const nextSpy = jest.fn();

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
    next = nextSpy;
  });

  describe('RELEVANT_ROUTES', () => {
    it('should return an array of routes', () => {
      const expected = [
        POLICY.LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT,
        POLICY.LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHANGE,
        POLICY.LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHECK_AND_CHANGE,
        POLICY.LOSS_PAYEE_FINANCIAL_DETAILS_UK_SAVE_AND_BACK,
        POLICY.LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT,
        POLICY.LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_CHANGE,
        POLICY.LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_CHECK_AND_CHANGE,
        POLICY.LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_SAVE_AND_BACK,
        POLICY.CHECK_YOUR_ANSWERS,
        CHECK_YOUR_ANSWERS_APPLICATION_TYPE_OF_POLICY,
      ];

      expect(RELEVANT_ROUTES).toEqual(expected);
    });
  });

  describe('when the route is not relevant', () => {
    beforeEach(() => {
      req.originalUrl = `${INSURANCE_ROOT}${referenceNumber}${ALL_SECTIONS}`;
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
    });

    describe('when an application is not returned from the API', () => {
      const getApplicationSpy = jest.fn(() => Promise.resolve());

      beforeEach(() => {
        api.keystone.application.getByReferenceNumber = getApplicationSpy;
      });

      it(`should redirect to ${INSURANCE_ROUTES.PAGE_NOT_FOUND}`, async () => {
        await getApplicationByReferenceNumberMiddleware(req, res, next);

        expect(res.redirect).toHaveBeenCalledWith(INSURANCE_ROUTES.PAGE_NOT_FOUND);
      });
    });

    describe('when the API call fails', () => {
      const getApplicationSpy = jest.fn(() => Promise.reject(new Error('mock')));

      beforeEach(() => {
        api.keystone.application.getByReferenceNumber = getApplicationSpy;
      });

      it(`should redirect to ${INSURANCE_ROUTES.PAGE_NOT_FOUND}`, async () => {
        await getApplicationByReferenceNumberMiddleware(req, res, next);

        expect(res.redirect).toHaveBeenCalledWith(INSURANCE_ROUTES.PAGE_NOT_FOUND);
      });
    });

    describe('when there no req.params.referenceNumber', () => {
      it(`should redirect to ${INSURANCE_ROUTES.PAGE_NOT_FOUND}`, async () => {
        delete req.params.referenceNumber;
        await getApplicationByReferenceNumberMiddleware(req, res, next);

        expect(res.redirect).toHaveBeenCalledWith(INSURANCE_ROUTES.PAGE_NOT_FOUND);
      });
    });
  });
});
