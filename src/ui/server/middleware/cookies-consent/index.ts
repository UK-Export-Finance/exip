import * as dotenv from 'dotenv';
import { Request, Response } from '../../../types';
import { SECURE_OPTION_COOKIE } from '../../constants';

dotenv.config();

export const cookiesConsent = (req: Request, res: Response, next: () => void) => {
  if (req.cookies) {
    if (req.cookies.optionalCookies || req.cookies[SECURE_OPTION_COOKIE]) {
      res.locals.cookieConsentDecision = true;
    }

    if (req.cookies.optionalCookies === 'true' || req.cookies[SECURE_OPTION_COOKIE] === 'true') {
      res.locals.cookieConsent = true;
      res.locals.googleAnalyticsId = process.env.GOOGLE_ANALYTICS_ID;
    } else {
      res.locals.cookieConsent = false;
    }

    if (req.session.cookieConsentNewDecision) {
      res.locals.cookieConsentNewDecision = true;

      delete req.session.cookieConsentNewDecision;
    }
  }

  next();
};
