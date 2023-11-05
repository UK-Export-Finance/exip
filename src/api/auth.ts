import 'dotenv/config';
import { createAuth } from '@keystone-6/auth';

import { statelessSessions } from '@keystone-6/core/session';

const sessionSecret = String(process.env.SESSION_SECRET);

if (!sessionSecret) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('SESSION_SECRET environment variable must be set in production');
  }
}

/**
 * KeystoneJS admin UI/CMS authentication configuration
 * Uses standard setup as per documentation: https://keystonejs.com/docs/config/auth
 * This essentially adds account creation in the admin UI/CMS.
 * Without this, anyone could open the admin UI/CMS.
 * @returns {Object} AuthConfig
 */
const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  sessionData: 'name',
  secretField: 'password',
  initFirstItem: {
    /**
     * Ensure that if there are no items in the database,
     * keystone admin UI will ask you to create
     * a new user, with the following fields.
     */
    fields: ['name', 'email', 'password'],
  },
});

const sessionMaxAge = 60 * 60 * 24 * 30; // 30 days

/**
 * KeystoneJS admin UI/CMS session configuration
 * Uses standard setup as per documentation: https://keystonejs.com/docs/config/session
 * @returns {Object} SessionStrategy
 */
const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: sessionSecret,
});

export { withAuth, session };
