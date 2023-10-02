/**
 * `cypress-v10-preserve-cookie` package does not setting
 * `__Host-` prefixed cookie.
 * TODO: Ensure E2E are executed using `__Host-` cookie
 */
const PREFIX = '__Host-';

const NAME = {
  SESSION: `${PREFIX}SID`,
  CSRF: `${PREFIX}CSRF`,
  OPTION: `${PREFIX}optionalCookies`,
};

export const COOKIE = {
  NAME,
};
