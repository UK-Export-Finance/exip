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
import { meta, integrity, csrf as csrfToken, cookiesConsent, security, seo, queryParams } from './middleware';
import { Request, Response } from '../types';

import * as dotenv from 'dotenv';

dotenv.config();
const { SESSION_SECRET } = process.env;

import configureNunjucks from './nunjucks-configuration';
import { rootRoute, quoteRoutes, insuranceRoutes } from './routes';
import { ROUTES, COOKIE } from './constants';
import { PAGES } from './content-strings';

import { requiredQuoteEligibilityDataProvided } from './middleware/required-data-provided/quote';
import { requiredInsuranceEligibilityDataProvided } from './middleware/required-data-provided/insurance/eligibility';
import applicationAccess from './middleware/insurance/application-access';
import applicationStatus from './middleware/insurance/application-status';
import getApplication from './middleware/insurance/get-application';
import userSession from './middleware/insurance/user-session';

import { http } from './helpers/http';
import { https } from './helpers/https';
import { isProduction } from './helpers/is-production';
import isInsuranceRoute from './helpers/is-insurance-route';
import getUserNameFromSession from './helpers/get-user-name-from-session';
import corePageVariables from './helpers/page-variables/core';
import isQuoteRoute from './helpers/is-quote-route';

// @ts-ignore
const ui = express();

ui.use(meta);
ui.use(integrity);
ui.use(seo);
ui.use(security);
ui.use(compression());
ui.use(queryParams);

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 1000, // 1K requests / 1 window
  standardHeaders: false,
  legacyHeaders: false,
});

/**
 * Production only services:
 * 1. Rate limiter
 * 2. Trust proxy (X-Forwarded-Proto)
 * Express will have knowledge that it's sitting behind a proxy and that the X-Forwarded-*
 * header fields may be trusted.
 */
if (isProduction()) {
  ui.use(limiter);
  ui.set('trust proxy', 1);
}

const cookie = {
  path: '/',
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: COOKIE.TTL.SESSION,
} as csrf.CookieOptions;

const sessionOptions = {
  name: COOKIE.NAME.SESSION,
  secret: SESSION_SECRET || crypto.randomBytes(256 / 8).toString('hex'),
  resave: false,
  saveUninitialized: true,
  cookie,
};

ui.use(session(sessionOptions));

// @ts-ignore
ui.use(express.json());
// @ts-ignore
ui.use(express.urlencoded({ extended: true }));

ui.use(cookieParser());
ui.use(
  csrf({
    cookie: {
      ...cookie,
      key: COOKIE.NAME.CSRF,
      maxAge: COOKIE.TTL.CSRF,
    },
  }),
);

ui.use(cookiesConsent);
ui.use(csrfToken());
ui.use(flash());

configureNunjucks({
  autoescape: true,
  express: ui,
  noCache: true,
});

ui.use(
  morgan('dev', {
    // @ts-ignore
    skip: (req) => req.url.startsWith('/assets'),
  }),
);

ui.use('/quote', requiredQuoteEligibilityDataProvided);
ui.use('/insurance/eligibility', requiredInsuranceEligibilityDataProvided);
ui.use('/insurance/:referenceNumber/*', getApplication);
ui.use('/insurance/:referenceNumber/*', applicationAccess);
ui.use('/insurance/:referenceNumber/*', applicationStatus);
ui.use('/', userSession);

ui.use('/', rootRoute);
ui.use('/', quoteRoutes);
ui.use('/', insuranceRoutes);

ui.use(
  '/assets',
  // @ts-ignore
  express.static(path.join(__dirname, '..', 'node_modules', 'govuk-frontend', 'dist', 'govuk', 'assets')),
  // @ts-ignore
  express.static(path.join(__dirname, '..', 'public')),
);

/* eslint-disable no-unused-vars, prettier/prettier */
// @ts-ignore
const errorHandler: express.ErrorRequestHandler = (err, req, res, next) => {
  console.error('Error with EXIP UI app %O', err);
  res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
};
/* eslint-enable no-unused-vars, prettier/prettier */

ui.use(errorHandler);

const INSURANCE_PAGE_NOT_FOUND_TEMPLATE = 'insurance/page-not-found.njk';
const PAGE_NOT_FOUND_TEMPLATE = 'page-not-found.njk';

ui.get('*', (req: Request, res: Response) => {
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

/**
 * Azure WebApp will strip TLS before reaching the express server.
 * Due to above constraint one can only run HTTP server on Azure,
 * however it is proxied behind a HTTPS connection therefore
 * `trust proxy` has been enabled.
 *
 * However for localhost and GHA a HTTPS server with a self-signed
 * certificate will be spawned to allow creation of `__Host-` prefixed
 * cookies and a uniform environment.
 */
if (isProduction()) {
  http(ui);
} else {
  https(ui);
}
