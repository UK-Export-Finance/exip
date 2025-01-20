import { QUOTE_ROUTES } from './quote';
import { INSURANCE_ROUTES } from './insurance';
import { WELL_KNOWN_ROUTES } from './wellKnown';

export const ROUTES = {
  ROOT: '/',
  ACCESSIBILITY_STATEMENT: '/accessibility-statement',
  COOKIES: '/cookies',
  COOKIES_CONSENT: '/cookies-consent',
  COOKIES_SAVED: '/cookies/saved',
  CONTACT_US: '/contact-us',
  PROBLEM_WITH_SERVICE: '/problem-with-service',
  THANKYOU: '/thanks.txt',
  QUOTE: QUOTE_ROUTES,
  INSURANCE: INSURANCE_ROUTES,
  WELL_KNOWN: WELL_KNOWN_ROUTES,
};
