import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';

const ACCOUNT = {
  CREATE: {
    YOUR_DETAILS: {
      PAGE_TITLE: 'Create an account',
      INTRO: "Enter your details and then we'll send you a link to confirm your email address.",
      ALREADY_GOT_AN_ACCOUNT: "Sign in if you've already got an account",
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
            HREF: INSURANCE_ROUTES.ACCOUNT.CREATE.CONFIRM_EMAIL_RESENT,
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
  },
  SIGN_IN: {
    ROOT: {
      SUCCESS_BANNER: {
        HEADING: "You've confirmed your email address and activated your account.",
        SIGN_IN_TO_CONTINUE: 'Sign in to continue your application.',
      },
      PAGE_TITLE: 'Sign in',
      RESET_PASSWORD: {
        TEXT: 'Reset password',
        HREF: INSURANCE_ROUTES.ACCOUNT.RESET_PASSWORD.ROOT,
      },
      NEED_TO_CREATE_ACCOUNT: {
        HEADING: 'If you need to create an account',
        LINK: {
          TEXT: 'Create your account',
          HREF: INSURANCE_ROUTES.ACCOUNT.CREATE.YOUR_DETAILS,
        },
      },
    },
  },
};

export default ACCOUNT;
