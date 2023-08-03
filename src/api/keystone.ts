import 'dotenv/config';
import { config } from '@keystone-6/core';
import checkApiKey from './middleware/headers/check-api-key';
import rateLimiter from './middleware/rate-limiter';
import { lists } from './schema';
import { withAuth, session } from './auth';
import { extendGraphqlSchema } from './custom-schema';

const { NODE_ENV, DATABASE_URL } = process.env;

/**
 * Only allow the following functionalities to run if the environment is development.
 * These functionalities should be disabled in any other environment.
 * 1) Logging of database operations
 * 2) GraphQL playground
 * 3) Apollo introspection
 */
const isDevEnvironment = NODE_ENV === 'development';

/**
 * Disable the following functionalities if the environment is production
 * Note - disabling this in a dev environment breaks things,
 * It has to be disabled explicitly in a production mode.
 * 1) Keystone Admin UI/CMS
 */
const isProdEnvironment = NODE_ENV === 'production';

/**
 * KeystoneJS configuration
 * This file sets up the following:
 * - Server port
 * - Database provider, URL, logging
 * - GraphQL playground and apollo configuration
 * - KeystoneJS admin UI/CMS configuration (via withAuth function)
 * - KeystoneJS admin UI/CMS session configuration
 * - KeystoneJS lists schema (API and DB fields/operations that will be automatically generated)
 * - KeystoneJS custom schema (custom GraphQL operations defined outside of the supported lists schema)
 * - KeystoneJS telemetry data (disabled, otherwise is enabled by default)
 * @returns {Object} AuthConfig
 */
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
      enableLogging: isDevEnvironment,
    },
    graphql: {
      playground: isDevEnvironment,
      apolloConfig: {
        introspection: isDevEnvironment,
      },
    },
    ui: {
      isDisabled: isProdEnvironment,
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists,
    session,
    extendGraphqlSchema,
    telemetry: false,
  }),
);
