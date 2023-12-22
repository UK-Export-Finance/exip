import nunjucks from 'nunjucks';

interface Opts {
  autoescape: boolean;
  express: object;
  noCache: boolean;
}

const configureNunjucks = (opts: Opts) => {
  // TODO: EMS-2475
  // 'node_modules/@ministryofjustice/frontend'

  const appViews = ['node_modules/govuk-frontend/dist', 'templates'];

  nunjucks.configure(appViews, opts);

  return nunjucks;
};

export default configureNunjucks;
