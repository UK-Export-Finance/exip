import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { CUSTOMER_SERVICE_CONTACT_DETAILS } from '../../../contact';
import { LINKS } from '../../../links';

const ACCOUNT = {
  CREATE: {
    YOUR_DETAILS: {
      PAGE_TITLE: 'Create an account',
      INTRO: "Enter your details and then we'll send you a link to confirm your email address.",
      ALREADY_GOT_AN_ACCOUNT: "Sign in if you've already got an account",
      PRIVACY: {
        HEADING: 'Privacy notice',
        MAIN_TEXT:
          'UKEF is committed to protecting the privacy and security of the personal information it processes. UKEF complies with all applicable laws relating to the processing of such information. For details on this, and personal rights in this regard, please see',
        LINK: {
          TEXT: "UKEF's privacy notice.",
          HREF: LINKS.EXTERNAL.PRIVACY,
        },
      },
    },
    CONFIRM_EMAIL: {
      PAGE_TITLE: 'Confirm your email address',
      WE_SENT_LINK_TO: "We've sent you a link to",
      CHECK_YOUR_EMAIL: 'Check your email and follow the link to confirm your email address and activate your account.',
      HAVING_PROBLEMS: {
        HEADING: 'Having problems?',
        REQUEST_NEW: {
          YOU_CAN: 'You can',
          LINK: {
            TEXT: 'request a new link,',
            HREF: INSURANCE_ROUTES.ACCOUNT.CREATE.RESEND_CONFIRM_EMAIL,
          },
          IF_NOT_RECEIVED: 'if you do not receive anything after 5 minutes.',
        },
        WRONG_EMAIL: {
          ENTERED_INCORRECTLY: "If you entered the wrong email address, you'll need to",
          CREATE_ACCOUNT_AGAIN: {
            TEXT: 'create your account again.',
            HREF: INSURANCE_ROUTES.ACCOUNT.CREATE.YOUR_DETAILS,
          },
        },
      },
    },
    CONFIRM_EMAIL_RESENT: {
      PAGE_TITLE: 'New link sent - confirm your email address',
      WE_SENT_LINK_TO: "We've sent another link by email to",
    },
    VERIFY_EMAIL_EXPIRED_LINK: {
      PAGE_TITLE: 'Your link has expired',
      NOT_VERIFIED: 'Your account has not been verified.',
      CAN_SEND_NEW_LINK: 'If you would still like to verify your account we can send you a new link.',
      REQUEST_NEW_LINK: {
        TEXT: 'Request a new link',
        HREF: INSURANCE_ROUTES.ACCOUNT.CREATE.YOUR_DETAILS,
      },
    },
  },
  SIGN_IN: {
    ROOT: {
      SUCCESS_BANNER: {
        HEADING: "You've confirmed your email address and activated your account.",
        SIGN_IN_TO_CONTINUE: 'Sign in to continue your application.',
      },
      IMPORTANT_BANNER: {
        SUCCESSFULLY_SIGNED_OUT: 'You have successfully signed out.',
      },
      PAGE_TITLE: 'Sign in',
      PASSWORD_RESET: {
        TEXT: 'Reset password',
        HREF: INSURANCE_ROUTES.ACCOUNT.PASSWORD_RESET.ROOT,
      },
      NEED_TO_CREATE_ACCOUNT: {
        HEADING: 'If you need to create an account',
        LINK: {
          TEXT: 'Create your account',
          HREF: INSURANCE_ROUTES.ACCOUNT.CREATE.YOUR_DETAILS,
        },
      },
    },
    ENTER_CODE: {
      PAGE_TITLE: 'Check your email',
      INTRO: "We've sent you an email with an access code. This code will expire after 5 minutes.",
      REQUEST_NEW_CODE: {
        TEXT: 'Request a new access code',
        HREF: INSURANCE_ROUTES.ACCOUNT.SIGN_IN.REQUEST_NEW_CODE,
      },
      SUCCESS_BANNER: {
        NEW_CODE_SENT: "We've sent a new access code to your email address.",
      },
    },
    REQUEST_NEW_CODE: {
      PAGE_TITLE: 'Request a new access code',
      INTRO: 'Emails sometimes take a few minutes to arrive. If you do not receive the email, after this you can request a new one.',
      DO_NOT_HAVE_EMAIL_ACCESS: {
        INTRO: 'I do not have access to this email inbox',
        CANNOT_ACCESS: 'If you cannot access your email',
        CONTACT_US: {
          TEXT: 'contact us',
          HREF: '#',
        },
        OUTRO: 'for help signing in.',
      },
    },
  },
  PASSWORD_RESET: {
    ROOT: {
      PAGE_TITLE: 'Enter your email to reset your password',
    },
    LINK_SENT: {
      PAGE_TITLE: "We've emailed you a link to reset your password",
      CHECK_YOUR_INBOX: 'Check your inbox for',
      FOLLOW_THE_LINK: 'Then follow the link to reset your password',
      NOT_RECEIVED_ANYTHING: {
        HEADING: 'If you have not received anything after 5 minutes',
        YOU_CAN: 'You can',
        LINK: {
          TEXT: 'get a new password reset link.',
          HREF: INSURANCE_ROUTES.ACCOUNT.PASSWORD_RESET.ROOT,
        },
      },
      NOT_YOUR_EMAIL_ADDRESS: {
        HEADING: 'If this is not your email address',
        NEED_TO: "You'll need to",
        LINK: {
          TEXT: 'enter your email address again.',
          HREF: INSURANCE_ROUTES.ACCOUNT.PASSWORD_RESET.ROOT,
        },
      },
    },
    EXPIRED_LINK: {
      PAGE_TITLE: 'Your password reset link has expired',
      PASSWORD_NOT_RESET: 'Your password has not been reset.',
      IF_YOU_WOULD_LIKE: 'If you would still like to reset your password we can send you a new link.',
    },
    NEW_PASSWORD: {
      PAGE_TITLE: 'Reset your password',
    },
    SUCCESS: {
      PAGE_TITLE: "You've successfully reset your password",
    },
  },
  MANAGE: {
    PAGE_TITLE: 'Your account',
    INTRO: 'To update information relating to your account (for example your email address), please contact our customer service helpline.',
    CUSTOMER_SERVICE: {
      HEADING: 'UK Export Finance customer service helpline',
      ...CUSTOMER_SERVICE_CONTACT_DETAILS,
    },
  },
  SIGNED_OUT: {
    PAGE_TITLE: 'For your security, we signed you out',
  },
  SUSPENDED: {
    ROOT: {
      PAGE_TITLE: 'This account has been temporarily suspended',
      BODY: 'This can happen if there are too many failed attempts to login or reset a password.',
    },
    EMAIL_SENT: {
      PAGE_TITLE: 'Check your email',
      WE_SENT_LINK_TO: "We've sent you a link to",
      CHECK_YOUR_EMAIL: 'Check your email and follow the link to confirm your email address and reactivate your account.',
      HAVING_PROBLEMS: 'Having problems?',
    },
    VERIFY_EMAIL_EXPIRED_LINK: {
      PAGE_TITLE: 'Your link has expired',
      BODY: "Your account has not been reactivated. You'll need to request another reactivation link.",
    },
  },
  REACTIVATED: {
    PAGE_TITLE: 'Your account has been reactivated',
    THANK_YOU: 'Thank you for confirming your email address. Your account has been reactivated and you can now sign in.',
  },
  INVALID_LINK: {
    PAGE_TITLE: 'Your link is not recognised',
    BODY: 'Please make sure you have copied the link correctly from the email we sent you.',
  },
};

export default ACCOUNT;
