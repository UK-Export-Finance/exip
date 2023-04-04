import 'dotenv/config';
import { config } from '@keystone-6/core';
import { lists } from './schema';
import { withAuth, session } from './auth';
import { extendGraphqlSchema } from './custom-schema';

const enableLogging = process.env.NODE_ENV === 'development';

export default withAuth(
  config({
    server: {
      port: 5001,
    },
    db: {
      provider: 'mysql',
      url: String(process.env.DATABASE_URL),
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
