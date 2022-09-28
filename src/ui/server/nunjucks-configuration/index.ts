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

  const nunjucksEnvironment = nunjucks.configure(appViews, opts);

  nunjucksEnvironment.addGlobal('runAnalytics', () => {
    if (process.env.NODE_ENV === 'production') {
      return true;
    }

    return false;
  });

  return nunjucks;
};

export default configureNunjucks;
