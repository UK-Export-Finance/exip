const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');

const security = require('./middleware/headers/security');
const configureNunjucks = require('./nunjucks-configuration');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(security);

configureNunjucks({
  autoescape: true,
  express: app,
  noCache: true,
});

app.use(compression());
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

app.listen(PORT, () => console.info(`EXIP UI app listening on port ${PORT}!`))
