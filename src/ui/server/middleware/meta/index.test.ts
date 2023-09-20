import { mockNext, mockReq, mockRes } from '../../test-mocks';
import { Request, Response } from '../../../types';
import { meta } from '.';
import { PRODUCT } from '../../content-strings';

const req: Request = mockReq();
const res: Response = mockRes();
const next = mockNext;

describe('middleware/meta', () => {
  it('should have all the properties in res.locals.meta object', () => {
    meta(req, res, next);
    expect(res.locals.meta).toEqual({
      URL: `${req.hostname}${req.originalUrl}`,
      TITLE: PRODUCT.DESCRIPTION.GENERIC,
      ORGANISATION: PRODUCT.DESCRIPTION.ORGANISATION,
    });
  });

  it('should have all meta-data properties defined', () => {
    meta(req, res, next);

    expect(res.locals.meta?.URL).toBeDefined();
    expect(res.locals.meta?.TITLE).toBeDefined();
    expect(res.locals.meta?.ORGANISATION).toBeDefined();
  });

  it('should have meta-data title set to generic production description', () => {
    meta(req, res, next);
    expect(res.locals.meta?.TITLE).toEqual(PRODUCT.DESCRIPTION.GENERIC);
  });

  it('should call next()', () => {
    meta(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('should merge new locals variable to existing res.locals', () => {
    res.locals.googleAnalyticsId = 'mock';
    meta(req, res, next);

    expect(res.locals.googleAnalyticsId).toBeDefined();
    expect(res.locals.googleAnalyticsId).toEqual('mock');
  });
});
