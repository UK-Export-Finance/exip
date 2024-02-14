import nunjucks from 'nunjucks';

interface Opts {
  autoescape: boolean;
  express: object;
  noCache: boolean;
}

const configureNunjucks = (opts: Opts) => {
  const appViews = ['node_modules/govuk-frontend/dist', 'node_modules/@ministryofjustice/frontend', 'templates'];

  nunjucks.configure(appViews, opts);

  return nunjucks;
};

export default configureNunjucks;
