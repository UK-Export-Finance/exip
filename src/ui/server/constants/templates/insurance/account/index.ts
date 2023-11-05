export const ACCOUNT_TEMPLATES = {
  CREATE: {
    YOUR_DETAILS: 'insurance/account/create/your-details.njk',
    CONFIRM_EMAIL: 'insurance/account/create/confirm-email.njk',
    CONFIRM_EMAIL_RESENT: 'insurance/account/create/confirm-email-resent.njk',
    VERIFY_EMAIL_EXPIRED_LINK: 'insurance/account/create/verify-email-expired-link.njk',
  },
  SIGN_IN: {
    ROOT: 'insurance/account/sign-in/sign-in.njk',
    ENTER_CODE: 'insurance/account/sign-in/enter-code.njk',
    REQUEST_NEW_CODE: 'insurance/account/sign-in/request-new-code.njk',
  },
  PASSWORD_RESET: {
    ROOT: 'insurance/account/password-reset/password-reset.njk',
    LINK_SENT: 'insurance/account/password-reset/link-sent.njk',
    EXPIRED_LINK: 'insurance/account/password-reset/expired-link.njk',
    NEW_PASSWORD: 'insurance/account/password-reset/new-password.njk',
    SUCCESS: 'insurance/account/password-reset/success.njk',
  },
  MANAGE: 'insurance/account/manage.njk',
  SIGNED_OUT: 'insurance/account/signed-out.njk',
  SUSPENDED: {
    ROOT: 'insurance/account/suspended/suspended.njk',
    EMAIL_SENT: 'insurance/account/suspended/email-sent.njk',
    VERIFY_EMAIL_EXPIRED_LINK: 'insurance/account/suspended/expired-link.njk',
  },
  REACTIVATED: 'insurance/account/reactivated.njk',
  INVALID_LINK: 'insurance/account/invalid-link.njk',
};
