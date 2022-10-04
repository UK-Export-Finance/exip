import nunjucks from 'nunjucks';
import * as dotenv from 'dotenv';

dotenv.config();

interface Opts {
  autoescape: boolean;
  express: object;
  noCache: boolean;
}

const configureNunjucks = (opts: Opts) => {
  const appViews = ['node_modules/govuk-frontend', 'templates'];

  nunjucks.configure(appViews, opts);

  return nunjucks;
};

export default configureNunjucks;
