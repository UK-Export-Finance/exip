import { mockNext, mockReq, mockRes } from '../../test-mocks';
import { Request, Response } from '../../../types';
import { integrity } from '.';
import { INTEGRITY } from '../../constants';

const { JS, GOVUK, FORM, COOKIES, GA, GA_TAG_MANAGER, MOJ, ACCESSIBILITY } = INTEGRITY;
const req: Request = mockReq();
const res: Response = mockRes();
const next = mockNext;

describe('middleware/integrity', () => {
  it('should have all the properties in res.locals.SRI object', () => {
    integrity(req, res, next);

    expect(res.locals.SRI).toEqual({
      JS,
      GOVUK,
      FORM,
      COOKIES,
      GA,
      GA_TAG_MANAGER,
      MOJ,
      ACCESSIBILITY,
    });
  });

  it('should have all SRI defined', () => {
    integrity(req, res, next);

    expect(res.locals.SRI?.JS).toBeDefined();
    expect(res.locals.SRI?.ACCESSIBILITY).toBeDefined();
    expect(res.locals.SRI?.MOJ).toBeDefined();
    expect(res.locals.SRI?.GOVUK).toBeDefined();
    expect(res.locals.SRI?.FORM).toBeDefined();
    expect(res.locals.SRI?.COOKIES).toBeDefined();
    expect(res.locals.SRI?.GA).toBeDefined();
    expect(res.locals.SRI?.GA_TAG_MANAGER).toBeDefined();
  });

  it('should have all SRI calculated using SHA512', () => {
    integrity(req, res, next);

    expect(res.locals.SRI?.JS).toContain('sha512');
    expect(res.locals.SRI?.ACCESSIBILITY).toContain('sha512');
    expect(res.locals.SRI?.MOJ).toContain('sha512');
    expect(res.locals.SRI?.GOVUK).toContain('sha512');
    expect(res.locals.SRI?.FORM).toContain('sha512');
    expect(res.locals.SRI?.COOKIES).toContain('sha512');
    expect(res.locals.SRI?.GA).toContain('sha512');
    expect(res.locals.SRI?.GA_TAG_MANAGER).toContain('sha512');
  });

  it('should call next()', () => {
    integrity(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('should merge new locals variable to existing res.locals', () => {
    res.locals.googleAnalyticsId = 'mock';
    integrity(req, res, next);

    expect(res.locals.googleAnalyticsId).toBeDefined();
    expect(res.locals.googleAnalyticsId).toEqual('mock');
  });
});
