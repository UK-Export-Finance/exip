import 'dotenv/config';
import { config } from '@keystone-6/core';
import checkApiKey from './middleware/headers/check-api-key';
import rateLimiter from './middleware/rate-limiter';
import { lists } from './schema';
import { withAuth, session } from './auth';
import { extendGraphqlSchema } from './custom-schema';

const { NODE_ENV, DATABASE_URL } = process.env;

const enableLogging = NODE_ENV === 'development';

export default withAuth(
  config({
    server: {
      port: 5001,
      extendExpressApp: (app) => {
        if (NODE_ENV === 'production') {
          app.use(rateLimiter);
        }

        app.use(checkApiKey);
      },
    },
    db: {
      provider: 'mysql',
      url: String(DATABASE_URL),
      enableLogging,
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists,
    session,
    extendGraphqlSchema,
  }),
);
