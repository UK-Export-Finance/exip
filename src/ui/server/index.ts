/* eslint-disable @typescript-eslint/ban-ts-comment */

import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import crypto from 'crypto';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import path from 'path';
import flash from 'connect-flash';
import basicAuth from 'express-basic-auth';

import { csrf as csrfToken, security, seo } from './middleware';
import { Request, Response } from '../types';

import * as dotenv from 'dotenv';

dotenv.config();

import configureNunjucks from './nunjucks-configuration';

import routes from './routes/index';
import { PRODUCT, FOOTER, PAGES } from './content-strings';

// @ts-ignore
const app = express();
const PORT = process.env.PORT || 5000;
const https = Boolean(process.env.HTTPS || 0);

app.use(seo);
app.use(security);
app.use(compression());

const cookie = {
  path: '/',
  httpOnly: true,
  secure: https,
  sameSite: 'strict',
  maxAge: 604800000, // 7 days
} as csrf.CookieOptions;

const sessionOptions = {
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
app.use(csrf({
  cookie: {
    ...cookie,
    maxAge: 43200, // 12 hours
  },
}));

app.use(csrfToken());

app.use(flash());

configureNunjucks({
  autoescape: true,
  express: app,
  noCache: true,
});

app.use(morgan('dev', {
  // @ts-ignore
  skip: (req) => req.url.startsWith('/assets'),
}));

app.use(basicAuth({
  users: { // @ts-ignore
    [process.env.BASIC_AUTH_KEY]: process.env.BASIC_AUTH_SECRET, // @ts-ignore
    [process.env.USER_1_KEY]: process.env.USER_1_SECRET, // @ts-ignore
    [process.env.USER_2_KEY]: process.env.USER_2_SECRET, // @ts-ignore
    [process.env.USER_3_KEY]: process.env.USER_3_SECRET, // @ts-ignore
    [process.env.USER_4_KEY]: process.env.USER_4_SECRET, // @ts-ignore
    [process.env.USER_5_KEY]: process.env.USER_5_SECRET, // @ts-ignore
  },
  challenge: true,
}));

app.use('/', routes);

app.use(
  '/assets',
  // @ts-ignore
  express.static(path.join(__dirname, '..', 'node_modules', 'govuk-frontend', 'govuk', 'assets')),
  // @ts-ignore
  express.static(path.join(__dirname, '..', 'public')),
);

// @ts-ignore
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.redirect('/problem-with-service');
});

app.get('*', (req: Request, res: Response) => res.render('page-not-found.njk', {
  CONTENT_STRINGS: {
    PRODUCT,
    FOOTER,
    ...PAGES.PAGE_NOT_FOUND_PAGE,
  },
}));

app.listen(PORT, () => console.info(`EXIP UI app listening on port ${PORT}!`));

/* eslint-enable @typescript-eslint/ban-ts-comment */
