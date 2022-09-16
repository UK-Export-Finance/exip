import 'dotenv/config';
import { createAuth } from '@keystone-6/auth';

import { statelessSessions } from '@keystone-6/core/session';

const sessionSecret = String(process.env.SESSION_SECRET);

if (!sessionSecret) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('SESSION_SECRET environment variable must be set in production');
  }
}

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  sessionData: 'name',
  secretField: 'password',
  initFirstItem: {
    // If there are no items in the database, keystone will ask you to create
    // a new user, filling in these fields.
    fields: ['name', 'email', 'password'],
  },
});

const sessionMaxAge = 60 * 60 * 24 * 30; // 30 days

const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: sessionSecret,
});

export { withAuth, session };
