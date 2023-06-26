/* eslint-disable @typescript-eslint/ban-ts-comment */
import express from 'express';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import crypto from 'crypto';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import path from 'path';
import flash from 'connect-flash';
import basicAuth from 'express-basic-auth';
import { csrf as csrfToken, cookiesConsent, security, seo, queryParams } from './middleware';
import { Request, Response } from '../types';

import * as dotenv from 'dotenv';

dotenv.config();

import configureNunjucks from './nunjucks-configuration';

import { rootRoute, quoteRoutes, insuranceRoutes } from './routes';
import { ROUTES } from './constants';
import { PAGES } from './content-strings';
import { requiredQuoteEligibilityDataProvided } from './middleware/required-data-provided/quote';
import { requiredInsuranceEligibilityDataProvided } from './middleware/required-data-provided/insurance/eligibility';
import applicationAccess from './middleware/insurance/application-access';
import applicationStatus from './middleware/insurance/application-status';
import getApplication from './middleware/insurance/get-application';
import userSession from './middleware/insurance/user-session';
import isInsuranceRoute from './helpers/is-insurance-route';
import getUserNameFromSession from './helpers/get-user-name-from-session';
import corePageVariables from './helpers/page-variables/core';
import isQuoteRoute from './helpers/is-quote-route';

// @ts-ignore
const app1 = express();
app1.disable('x-powered-by');

const PORT = process.env.PORT || 5000;
const https = Boolean(process.env.HTTPS || 0);
const secureCookieName = https ? '__Host-exip-session' : 'exip-session';

app1.use(seo);
app1.use(security);
app1.use(compression());
app1.use(queryParams);

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 1000, // 1K requests / 1 window
  standardHeaders: false,
  legacyHeaders: false,
});

if (process.env.NODE_ENV === 'production') {
  app1.use(limiter);
}

const cookie = {
  path: '/',
  httpOnly: true,
  secure: https,
  sameSite: 'strict',
  maxAge: 604800000, // 7 days
} as csrf.CookieOptions;

const sessionOptions = {
  name: secureCookieName,
  secret: process.env.SESSION_SECRET || crypto.randomBytes(256 / 8).toString('hex'),
  resave: false,
  saveUninitialized: true,
  cookie,
};

app1.use(session(sessionOptions));

// @ts-ignore
app1.use(express.json());
// @ts-ignore
app1.use(express.urlencoded({ extended: true }));

app1.use(cookieParser());
app1.use(
  csrf({
    cookie: {
      ...cookie,
      maxAge: 43200, // 12 hours
    },
  }),
);

app1.use(cookiesConsent);

app1.use(csrfToken());

app1.use(flash());

configureNunjucks({
  autoescape: true,
  express: app1,
  noCache: true,
});

app1.use(
  morgan('dev', {
    // @ts-ignore
    skip: (req) => req.url.startsWith('/assets'),
  }),
);

if (process.env.NODE_ENV !== 'production') {
  app1.use(
    basicAuth({
      users: {
        // @ts-ignore
        [process.env.BASIC_AUTH_KEY]: process.env.BASIC_AUTH_SECRET, // @ts-ignore
      },
      challenge: true,
    }),
  );
}

app1.use('/quote', requiredQuoteEligibilityDataProvided);
app1.use('/insurance/eligibility', requiredInsuranceEligibilityDataProvided);
app1.use('/insurance/:referenceNumber/*', getApplication);
app1.use('/insurance/:referenceNumber/*', applicationAccess);
app1.use('/insurance/:referenceNumber/*', applicationStatus);
app1.use('/', userSession);

app1.use('/', rootRoute);
app1.use('/', quoteRoutes);
app1.use('/', insuranceRoutes);

app1.use(
  '/assets',
  // @ts-ignore
  express.static(path.join(__dirname, '..', 'node_modules', 'govuk-frontend', 'govuk', 'assets')),
  // @ts-ignore
  express.static(path.join(__dirname, '..', 'public')),
);

/* eslint-disable no-unused-vars, prettier/prettier */
// @ts-ignore
const errorHandler: express.ErrorRequestHandler = (err, req, res, next) => {
  console.error('Error with EXIP UI app', err);
  res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
};
/* eslint-enable no-unused-vars, prettier/prettier */

app1.use(errorHandler);

const INSURANCE_PAGE_NOT_FOUND_TEMPLATE = 'insurance/page-not-found.njk';
const PAGE_NOT_FOUND_TEMPLATE = 'page-not-found.njk';

app1.get('*', (req: Request, res: Response) => {
  /**
   * if route contains "insurance" eg /insurance/dashboard
   * insurance page-not-found should be rendered
   */
  if (isInsuranceRoute(req.originalUrl)) {
    return res.render(INSURANCE_PAGE_NOT_FOUND_TEMPLATE, {
      ...corePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.PAGE_NOT_FOUND_PAGE,
        ORIGINAL_URL: req.originalUrl,
      }),
      userName: getUserNameFromSession(req.session.user),
    });
  }

  // generic header if not quote route
  const setGenericHeader = !isQuoteRoute(req.originalUrl);

  // all other non-insurance page not found should use generic page-not-found template
  return res.render(PAGE_NOT_FOUND_TEMPLATE, {
    ...corePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.PAGE_NOT_FOUND_PAGE,
      ORIGINAL_URL: req.originalUrl,
      // generic header is used for non-insurance page not found
      USE_GENERIC_HEADER: setGenericHeader,
    }),
    userName: getUserNameFromSession(req.session.user),
  });
});

app1.listen(PORT, () => console.info(`EXIP UI app listening on port ${PORT}!`));

/* eslint-enable @typescript-eslint/ban-ts-comment */
