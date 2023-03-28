import 'dotenv/config';
import { config } from '@keystone-6/core';
import { lists } from './schema';
import { withAuth, session } from './auth';
import { extendGraphqlSchema } from './custom-schema';

export default withAuth(
  config({
    server: {
      port: 5001,
    },
    db: {
      provider: 'mysql',
      url: String(process.env.DATABASE_URL),
      enableLogging: false,
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists,
    session,
    extendGraphqlSchema,
  }),
);
