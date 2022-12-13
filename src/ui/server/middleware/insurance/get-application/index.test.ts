import getApplicationMiddleware from '.';
import { ROUTES } from '../../../constants';
import api from '../../../api';
import { mockReq, mockRes, mockApplication } from '../../../test-mocks';
import { Next, Request, Response } from '../../../../types';

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
