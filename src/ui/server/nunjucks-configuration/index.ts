import nunjucks from 'nunjucks';

interface Opts {
  autoescape: boolean;
  express: any;
  noCache: boolean;
}

const configureNunjucks = (opts: Opts) => {
  const appViews = [
    'node_modules/govuk-frontend',
    'templates',
  ];

  nunjucks.configure(appViews, opts);

  return nunjucks;
};

export default configureNunjucks;
