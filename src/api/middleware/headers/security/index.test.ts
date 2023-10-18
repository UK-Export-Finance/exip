import { Request, Response } from 'express';
import { mockReq, mockRes } from '../../../test-mocks';
import security from '.';

describe('api/middleware/headers/security', () => {
  let req: Request;
  let res: Response;

  const nextSpy = jest.fn();

  const setHeaderSpy = jest.fn();
  const removeHeaderSpy = jest.fn();

  beforeEach(() => {
    req = mockReq;
    res = mockRes();

    res.setHeader = setHeaderSpy;
    res.removeHeader = removeHeaderSpy;

    security(req, res, nextSpy);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should set `Strict-Transport-Security` header', () => {
    expect(setHeaderSpy).toHaveBeenCalledWith('Strict-Transport-Security', 'max-age=15552000; includeSubDomains; preload');
  });

  it('should set `X-Frame-Options` header', () => {
    expect(setHeaderSpy).toHaveBeenCalledWith('X-Frame-Options', 'deny');
  });

  it('should set `X-Content-Type-Options` header', () => {
    expect(setHeaderSpy).toHaveBeenCalledWith('X-Content-Type-Options', 'nosniff');
  });

  it('should call next()', () => {
    expect(nextSpy).toHaveBeenCalledTimes(1);
  });
});
