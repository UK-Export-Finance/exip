const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const crypto = require('crypto');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const path = require('path');
const flash = require('connect-flash');
const basicAuth = require('express-basic-auth');

const { csrf: csrfToken, security, seo } = require('./middleware');
const configureNunjucks = require('./nunjucks-configuration');
const routes = require('./routes');
const CONTENT_STRINGS = require('./content-strings');

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
};

const sessionOptions = {
  secret: process.env.SESSION_SECRET || crypto.randomBytes(256 / 8).toString('hex'),
  resave: false,
  saveUninitialized: true,
  cookie,
};

app.use(session(sessionOptions));

app.use(express.json());
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
  skip: (req) => req.url.startsWith('/assets'),
}));

app.use(basicAuth({
  users: {
    [process.env.BASIC_AUTH_KEY]: process.env.BASIC_AUTH_SECRET,
  },
  challenge: true,
}));

app.use('/', routes);

app.use(
  '/assets',
  express.static(path.join(__dirname, '..', 'node_modules', 'govuk-frontend', 'govuk', 'assets')),
  express.static(path.join(__dirname, '..', 'public')),
);

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.redirect('/problem-with-service');
});

app.get('*', (req, res) => res.render('page-not-found.njk', {
  CONTENT_STRINGS: {
    PRODUCT: CONTENT_STRINGS.PRODUCT,
    FOOTER: CONTENT_STRINGS.FOOTER,
    ...CONTENT_STRINGS.PAGES.PAGE_NOT_FOUND_PAGE,
  },
}));

app.listen(PORT, () => console.info(`EXIP UI app listening on port ${PORT}!`));
