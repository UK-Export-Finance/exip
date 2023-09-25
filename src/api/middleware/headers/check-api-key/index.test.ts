import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import checkApiKey from '.';
import { mockReq, mockRes } from '../../../test-mocks';

const { API_KEY } = process.env;

describe('api/middleware/headers/check-api-key', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  const nextSpy = jest.fn();

  beforeEach(() => {
    req = mockReq;
    res = mockRes();
    next = nextSpy;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('when x-api-key header is valid', () => {
    it('should call next()', async () => {
      next = nextSpy;

      req.headers['x-api-key'] = API_KEY;

      checkApiKey(req, res, next);

      expect(nextSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('when x-api-key header is not provided', () => {
    it('should call res.status with 401', () => {
      req.headers = {};

      checkApiKey(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorised' });
    });
  });

  describe('when x-api-key header is an empty string', () => {
    it('should call res.status with 401', () => {
      req.headers['x-api-key'] = '';

      checkApiKey(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorised' });
    });
  });

  describe('when x-api-key header is invalid', () => {
    it('should call res.status with 401', () => {
      req.headers['x-api-key'] = `${API_KEY}-invalid`;

      checkApiKey(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorised' });
    });
  });
});
