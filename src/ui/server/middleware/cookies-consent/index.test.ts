import * as dotenv from 'dotenv';
import { mockNext, mockReq, mockRes } from '../../test-mocks';
import { Request, Response } from '../../../types';
import { cookiesConsent } from '.';
import { COOKIE } from '../../constants';

dotenv.config();

describe('middleware/cookies-consent', () => {
  const req: Request = mockReq();
  const res: Response = mockRes();
  const next = mockNext;

  describe('when req.cookies.optionalCookies exists', () => {
    beforeEach(() => {
      req.cookies.optionalCookies = 'mock';
    });

    it('should add cookieConsentDecision=true to res.locals', () => {
      cookiesConsent(req, res, next);

      expect(res.locals.cookieConsentDecision).toEqual(true);
    });
  });

  describe("when req.cookies['__Secure-optionalCookies'] exists", () => {
    beforeEach(() => {
      req.cookies[COOKIE.NAME.OPTION] = 'mock';
      req.cookies.optionalCookies = undefined;
    });

    it('should add cookieConsentDecision=true to res.locals', () => {
      cookiesConsent(req, res, next);

      expect(res.locals.cookieConsentDecision).toEqual(true);
    });
  });

  describe('when req.cookies.optionalCookies is `true`', () => {
    beforeEach(() => {
      req.cookies.optionalCookies = 'true';
      req.cookies[COOKIE.NAME.OPTION] = undefined;
    });

    it('should add cookieConsent=true to res.locals', () => {
      cookiesConsent(req, res, next);

      expect(res.locals.cookieConsent).toEqual(true);
    });

    it('should add process.env.GOOGLE_ANALYTICS_ID to res.locals.googleAnalyticsId', () => {
      cookiesConsent(req, res, next);

      expect(res.locals.googleAnalyticsId).toEqual(process.env.GOOGLE_ANALYTICS_ID);
    });

    it('should add process.env.GOOGLE_TAG_MANAGER_ID to res.locals.googleTagManagerId', () => {
      cookiesConsent(req, res, next);

      expect(res.locals.googleTagManagerId).toEqual(process.env.GOOGLE_TAG_MANAGER_ID);
    });
  });

  describe("when req.cookies['__Secure-optionalCookies'] is `true`", () => {
    beforeEach(() => {
      req.cookies[COOKIE.NAME.OPTION] = 'true';
      req.cookies.optionalCookies = undefined;
    });

    it('should add cookieConsent=true to res.locals', () => {
      cookiesConsent(req, res, next);

      expect(res.locals.cookieConsent).toEqual(true);
    });

    it('should add process.env.GOOGLE_ANALYTICS_ID to res.locals.googleAnalyticsId', () => {
      cookiesConsent(req, res, next);

      expect(res.locals.googleAnalyticsId).toEqual(process.env.GOOGLE_ANALYTICS_ID);
    });
  });

  describe('when req.cookies.optionalCookies is NOT `true`', () => {
    beforeEach(() => {
      req.cookies.optionalCookies = 'false';
      req.cookies[COOKIE.NAME.OPTION] = undefined;
    });

    it('should add cookieConsent=false to res.locals', () => {
      cookiesConsent(req, res, next);

      expect(res.locals.cookieConsent).toEqual(false);
    });
  });

  describe('when req.session has cookieConsentNewDecision', () => {
    it('should add cookieConsentNewDecision=true to res.locals', () => {
      req.session.cookieConsentNewDecision = true;

      cookiesConsent(req, res, next);

      expect(res.locals.cookieConsentNewDecision).toEqual(true);
    });

    it('should remove cookieConsentNewDecision from req.session', () => {
      req.session.cookieConsentNewDecision = true;

      cookiesConsent(req, res, next);

      expect(req.session.cookieConsentNewDecision).toBeUndefined();
    });
  });

  describe('when there are no req.cookies', () => {
    it('should call next', () => {
      req.cookies = {};

      cookiesConsent(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
