import * as dotenv from 'dotenv';
import { mockReq, mockRes } from '../../../test-mocks';
import { Request, Response } from '../../../../types';
import { security } from '.';

dotenv.config();

describe('middleware/security', () => {
  const req: Request = mockReq();
  const res: Response = mockRes();

  const setHeaderSpy = jest.fn();
  const removeHeaderSpy = jest.fn();

  const nextSpy = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();

    res.setHeader = setHeaderSpy;
    res.removeHeader = removeHeaderSpy;

    security(req, res, nextSpy);
  });

  describe('request', () => {
    describe('when req.headers.referer does not match the hostname', () => {
      it('should set req.headers.referer to an empty string', () => {
        req.headers.referer = `${req.hostname}-invalid`;

        security(req, res, nextSpy);

        expect(req.headers.referer).toEqual('');
      });
    });

    describe('when req.headers.referer matches the hostname', () => {
      it('should NOT modify req.headers.referer', () => {
        const validReferer = `http://${req.hostname}/test`;

        req.headers.referer = validReferer;

        security(req, res, nextSpy);

        expect(req.headers.referer).toEqual(validReferer);
      });
    });

    describe('when req.headers.origin does not match the hostname', () => {
      it('should set req.headers.origin to an empty string', () => {
        req.headers.origin = `${req.hostname}-invalid`;

        security(req, res, nextSpy);

        expect(req.headers.origin).toEqual('');
      });
    });

    describe('when req.headers.origin matches the hostname', () => {
      it('should NOT modify req.headers.origin', () => {
        const validOrigin = `http://${req.hostname}`;

        req.headers.origin = validOrigin;

        security(req, res, nextSpy);

        expect(req.headers.origin).toEqual(validOrigin);
      });
    });
  });

  describe('response', () => {
    it('should set `Strict-Transport-Security` header', () => {
      expect(setHeaderSpy).toHaveBeenCalledWith('Strict-Transport-Security', 'max-age=15552000; includeSubDomains; preload');
    });

    it('should set `X-Frame-Options` header', () => {
      expect(setHeaderSpy).toHaveBeenCalledWith('X-Frame-Options', 'deny');
    });

    it('should set `X-XSS-Protection` header', () => {
      expect(setHeaderSpy).toHaveBeenCalledWith('X-XSS-Protection', '1; mode=block');
    });

    it('should set `X-Content-Type-Options` header', () => {
      expect(setHeaderSpy).toHaveBeenCalledWith('X-Content-Type-Options', 'nosniff');
    });

    it('should set `Content-Security-Policy` header', () => {
      expect(setHeaderSpy).toHaveBeenCalledWith(
        'Content-Security-Policy',
        "default-src 'none';connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com;base-uri 'self';font-src 'self' data:;form-action 'self';frame-ancestors 'self';img-src 'self' https://*.google-analytics.com https://*.googletagmanager.com;object-src 'none';script-src 'self' https://*.google-analytics.com https://*.googletagmanager.com;script-src-attr 'self';style-src 'self';upgrade-insecure-requests",
      );
    });

    it('should set `Cache-Control` header', () => {
      expect(setHeaderSpy).toHaveBeenCalledWith('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=604800');
    });

    it('should set `Referrer-Policy` header', () => {
      expect(setHeaderSpy).toHaveBeenCalledWith('Referrer-Policy', 'same-origin');
    });

    it('should set `X-Download-Options` header', () => {
      expect(setHeaderSpy).toHaveBeenCalledWith('X-Download-Options', 'noopen');
    });

    it('should set `X-DNS-Prefetch-Control` header', () => {
      expect(setHeaderSpy).toHaveBeenCalledWith('X-DNS-Prefetch-Control', 'on');
    });

    it('should set `Expect-CT` header', () => {
      expect(setHeaderSpy).toHaveBeenCalledWith('Expect-CT', 'max-age=0,enforce');
    });

    it('should set `Cross-Origin-Opener-Policy` header', () => {
      expect(setHeaderSpy).toHaveBeenCalledWith('Cross-Origin-Opener-Policy', 'same-origin');
    });

    it('should set `Cross-Origin-Resource-Policy` header', () => {
      expect(setHeaderSpy).toHaveBeenCalledWith('Cross-Origin-Resource-Policy', 'same-origin');
    });

    it('should set `Cross-Origin-Embedder-Policy` header', () => {
      expect(setHeaderSpy).toHaveBeenCalledWith('Cross-Origin-Embedder-Policy', 'require-corp');
    });

    it('should set `Permissions-Policy` header', () => {
      expect(setHeaderSpy).toHaveBeenCalledWith(
        'Permissions-Policy',
        'fullscreen=(self),microphone=(),camera=(),payment=(),geolocation=(),display-capture=(),battery=(),autoplay=(),gyroscope=(),accelerometer=(),web-share=(),usb=(),gamepad=(),magnetometer=(),midi=(),picture-in-picture=(),xr-spatial-tracking=()',
      );
    });

    it('should remove `X-Powered-By` header', () => {
      expect(removeHeaderSpy).toHaveBeenCalledWith('X-Powered-By');
    });
  });

  it('should call next()', () => {
    expect(nextSpy).toHaveBeenCalledTimes(1);
  });
});
