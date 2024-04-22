import getApplicationMiddleware, { RELEVANT_ROUTES } from '.';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import api from '../../../api';
import mapTotalContractValueOverThreshold from '../map-total-contract-value-over-threshold';
import { mockReq, mockRes, mockApplication, referenceNumber } from '../../../test-mocks';
import { Next, Request, Response } from '../../../../types';

const {
  INSURANCE_ROOT,
  ELIGIBILITY_ROOT,
  ELIGIBILITY: { CHECK_IF_ELIGIBLE },
  ALL_SECTIONS,
  POLICY,
  EXPORTER_BUSINESS,
  YOUR_BUYER,
  EXPORT_CONTRACT,
  COMPLETE_OTHER_SECTIONS,
  CHECK_YOUR_ANSWERS: {
    TYPE_OF_POLICY: CHECK_YOUR_ANSWERS_APPLICATION_TYPE_OF_POLICY,
    YOUR_BUSINESS: CHECK_YOUR_ANSWERS_APPLICATION_YOUR_BUSINESS,
    YOUR_BUYER: CHECK_YOUR_ANSWERS_APPLICATION_YOUR_BUYER,
  },
  DECLARATIONS,
  APPLICATION_SUBMITTED,
} = INSURANCE_ROUTES;

const {
  LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT,
  LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHANGE,
  LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHECK_AND_CHANGE,
  LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT,
  LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_CHANGE,
  LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_CHECK_AND_CHANGE,
  CHECK_YOUR_ANSWERS,
  ...POLICY_ROUTES
} = POLICY;

describe('middleware/insurance/get-application', () => {
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
        ALL_SECTIONS,
        ...Object.values(POLICY_ROUTES),
        EXPORTER_BUSINESS.ROOT,
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
      req.originalUrl = `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}${CHECK_IF_ELIGIBLE}`;
      next = nextSpy;
    });

    it('should call next()', async () => {
      await getApplicationMiddleware(req, res, next);

      expect(nextSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe(`when the route is not relevant - ${LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT}`, () => {
    beforeEach(() => {
      req.originalUrl = `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}${LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT}`;
      next = nextSpy;
    });

    it('should call next()', async () => {
      await getApplicationMiddleware(req, res, next);

      expect(nextSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('when the route contains a relevant route', () => {
    beforeEach(() => {
      req.originalUrl = `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;
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

      it('should add the result of "mapTotalContractValueOverThreshold" to res.locals', async () => {
        await getApplicationMiddleware(req, res, next);

        const expected = mapTotalContractValueOverThreshold(mockApplication);

        expect(res.locals.application).toEqual(expected);
      });
    });

    describe('when an application is not returned from the API', () => {
      const getApplicationSpy = jest.fn(() => Promise.resolve());

      beforeEach(() => {
        api.keystone.application.get = getApplicationSpy;
      });

      it(`should redirect to ${INSURANCE_ROUTES.PAGE_NOT_FOUND}`, async () => {
        await getApplicationMiddleware(req, res, next);

        expect(res.redirect).toHaveBeenCalledWith(INSURANCE_ROUTES.PAGE_NOT_FOUND);
      });
    });

    describe('when the API call fails', () => {
      const getApplicationSpy = jest.fn(() => Promise.reject(new Error('mock')));

      beforeEach(() => {
        api.keystone.application.get = getApplicationSpy;
      });

      it(`should redirect to ${INSURANCE_ROUTES.PAGE_NOT_FOUND}`, async () => {
        await getApplicationMiddleware(req, res, next);

        expect(res.redirect).toHaveBeenCalledWith(INSURANCE_ROUTES.PAGE_NOT_FOUND);
      });
    });

    describe('when there no req.params.referenceNumber', () => {
      it(`should redirect to ${INSURANCE_ROUTES.PAGE_NOT_FOUND}`, async () => {
        delete req.params.referenceNumber;
        await getApplicationMiddleware(req, res, next);

        expect(res.redirect).toHaveBeenCalledWith(INSURANCE_ROUTES.PAGE_NOT_FOUND);
      });
    });
  });
});
