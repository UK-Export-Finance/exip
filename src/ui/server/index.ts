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
// TODO: Replace `csurf` package https://ukef-dtfs.atlassian.net/browse/EMS-1011
import { csrf as csrfToken, cookiesConsent, security, seo } from './middleware';
import { Request, Response } from '../types';

import * as dotenv from 'dotenv';

dotenv.config();

import configureNunjucks from './nunjucks-configuration';

import { rootRoute, quoteRoutes, insuranceRoutes } from './routes';
import { ROUTES } from './constants';
import { COOKIES_CONSENT, FOOTER, LINKS, PAGES, PRODUCT } from './content-strings';
import { requiredQuoteEligibilityDataProvided } from './middleware/required-data-provided/quote';
import { requiredInsuranceEligibilityDataProvided } from './middleware/required-data-provided/insurance/eligibility';
import getApplication from './middleware/insurance/get-application';

// @ts-ignore
const app = express();
const PORT = process.env.PORT || 5000;
const https = Boolean(process.env.HTTPS || 0);
const secureCookieName = https ? '__Host-exip-session' : 'exip-session';

app.use(seo);
app.use(security);
app.use(compression());

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 1000, // 1K requests / 1 window
  standardHeaders: false,
  legacyHeaders: false,
});

if (process.env.NODE_ENV === 'production') {
  app.use(limiter);
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

app.use(session(sessionOptions));

// @ts-ignore
app.use(express.json());
// @ts-ignore
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  csrf({
    cookie: {
      ...cookie,
      maxAge: 43200, // 12 hours
    },
  }),
);

app.use(cookiesConsent);

app.use(csrfToken());

app.use(flash());

configureNunjucks({
  autoescape: true,
  express: app,
  noCache: true,
});

app.use(
  morgan('dev', {
    // @ts-ignore
    skip: (req) => req.url.startsWith('/assets'),
  }),
);

if (process.env.NODE_ENV !== 'production') {
  app.use(
    basicAuth({
      users: {
        // @ts-ignore
        [process.env.BASIC_AUTH_KEY]: process.env.BASIC_AUTH_SECRET, // @ts-ignore
      },
      challenge: true,
    }),
  );
}

app.use('/quote', requiredQuoteEligibilityDataProvided);
app.use('/insurance/eligibility', requiredInsuranceEligibilityDataProvided);
app.use('/insurance/:referenceNumber/*', getApplication);

app.use('/', rootRoute);
app.use('/', quoteRoutes);
app.use('/', insuranceRoutes);

app.use(
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

app.use(errorHandler);

app.get('*', (req: Request, res: Response) =>
  res.render('page-not-found.njk', {
    CONTENT_STRINGS: {
      COOKIES_CONSENT,
      FOOTER,
      LINKS,
      PRODUCT: {
        ...PRODUCT,
        DESCRIPTION: PRODUCT.DESCRIPTION.GENERIC,
      },
      ...PAGES.PAGE_NOT_FOUND_PAGE,
    },
    START_ROUTE: ROUTES.QUOTE.START,
  }),
);

app.listen(PORT, () => console.info(`EXIP UI app listening on port ${PORT}!`));

/* eslint-enable @typescript-eslint/ban-ts-comment */
