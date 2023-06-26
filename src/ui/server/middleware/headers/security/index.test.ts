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
    describe('when req.headers.referer is not a URL', () => {
      it('should replace req.headers.referer with an empty string', () => {
        req.headers.referer = 'not-a-url';
        security(req, res, nextSpy);

        expect(req.headers.referer).toEqual('');
      });
    });

    describe('when req.headers.referer contains javascript', () => {
      it('should replace req.headers.referer with an empty string', () => {
        req.headers.referer = 'javascript.alert()';
        security(req, res, nextSpy);

        expect(req.headers.referer).toEqual('');
      });
    });

    describe('when req.headers.referer is a URL', () => {
      describe('when the origin matches process.env.URL_ORIGIN', () => {
        it('should NOT replace req.headers.referer with an empty string', () => {
          const validUrl = `${process.env.URL_ORIGIN}/mock-route`;

          req.headers.referer = validUrl;
          security(req, res, nextSpy);

          expect(req.headers.referer).toEqual(validUrl);
        });
      });

      describe('when the origin does NOT match process.env.URL_ORIGIN', () => {
        it('should replace req.headers.referer with an empty string', () => {
          const invalidUrl = 'https://invalid-domain.com';

          req.headers.referer = invalidUrl;
          security(req, res, nextSpy);

          expect(req.headers.referer).toEqual('');
        });
      });

      describe('when the origin does NOT match process.env.URL_ORIGIN and the origin is in another part of the string', () => {
        it('should replace req.headers.referer with an empty string', () => {
          const invalidUrl = `https://invalid-domain.com${process.env.URL_ORIGIN}/mock-route`;

          req.headers.referer = invalidUrl;
          security(req, res, nextSpy);

          expect(req.headers.referer).toEqual('');
        });
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
        "default-src 'none';connect-src https://region1.google-analytics.com 'self';base-uri 'self';block-all-mixed-content;font-src 'self' data:;form-action 'self';frame-ancestors 'self';img-src 'self';object-src 'none';script-src https://www.googletagmanager.com 'self' 'unsafe-inline';script-src-attr 'self' 'unsafe-inline';style-src 'self';upgrade-insecure-requests",
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
