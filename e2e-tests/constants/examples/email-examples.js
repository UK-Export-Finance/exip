const MAXIMUM = 300;
const suffix = '@email.com';
const extraCharactersLength = MAXIMUM - suffix.length + 1;

const ABOVE_MAXIMUM = `${'a'.repeat(extraCharactersLength)}${suffix}`;

export const INVALID_EMAILS = {
  NO_AT_SYMBOL: 'mockemail.com',
  NO_DOTS: 'mock@emailcom',
  WITH_SPACE: 'mock@email .com',
  NO_DOMAIN: 'mock@email.',
  ABOVE_MAXIMUM,
};

export const VALID_EMAIL = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');
