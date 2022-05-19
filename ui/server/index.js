const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const crypto = require('crypto');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const path = require('path');

const { csrf: csrfToken, security } = require('./middleware');
const configureNunjucks = require('./nunjucks-configuration');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;
const https = Boolean(process.env.HTTPS || 0);

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

app.use(cookieParser());
app.use(csrf());
app.use(csrfToken());

configureNunjucks({
  autoescape: true,
  express: app,
  noCache: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev', {
  skip: (req) => req.url.startsWith('/assets'),
}));

app.use('/', routes);

app.use(
  '/assets',
  express.static(path.join(__dirname, '..', 'node_modules', 'govuk-frontend', 'govuk', 'assets')),
  express.static(path.join(__dirname, '..', 'public')),
);

// app.get('*', (req, res) => res.render('page-not-found.njk', { user: req.session.user }));

app.listen(PORT, () => console.info(`EXIP UI app listening on port ${PORT}!`));
