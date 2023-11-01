const PREFIX = '__Host-';

const NAME = {
  SESSION: `${PREFIX}SID`,
  CSRF: `${PREFIX}CSRF`,
  OPTION: `${PREFIX}optionalCookies`,
};

// Time to live
const TTL = {
  SESSION: 604800000, // 7 days
  CSRF: 43200, // 12 hours
};

export const COOKIE = {
  NAME,
  TTL,
};
